# standard library imports
import logging
import argparse
from typing import Dict, List, Optional, Tuple, Any
from pydantic import BaseModel

# third party library imports
from environs import Env

# Palo Alto Networks imports
from panos.panorama import DeviceGroup, Panorama
from panos.policies import PreRulebase, PostRulebase, SecurityRule
from panos.objects import AddressObject, AddressGroup
from panapi import PanApiSession
from panapi.config.objects import Address as PrismaAddress


# ----------------------------------------------------------------------------
# Configure logging
# ----------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)


# ----------------------------------------------------------------------------
# Load environment variables from .env file
# ----------------------------------------------------------------------------
env = Env()
env.read_env()

pan_config = {
    "pan_url": env("PANURL", "panorama.lab.com"),
    "pan_token": env("PANTOKEN", "supersecret"),
}

prisma_config = {
    "client_id": env("PRISMA_CLIENT_ID", "automation@tsg.iam.panserviceaccount.com"),
    "client_secret": env(
        "PRISMA_CLIENT_SECRET", "12345678-1234-5678-90ab-1234567890ab"
    ),
    "tenant": env("PRISMA_TENANT", "1234567890"),
    "token_url": env(
        "PRISMA_TOKEN_URL",
        "https://auth.apps.paloaltonetworks.com/am/oauth2/access_token",
    ),
}


# ----------------------------------------------------------------------------
# Define data models
# ----------------------------------------------------------------------------
class SecurityRuleData(BaseModel):
    rule_name: str
    security_profile_group: Optional[List[str]]
    source_zones: List[str]
    destination_zones: List[str]
    source_addresses: List[str]
    destination_addresses: List[str]
    applications: List[str]
    services: List[str]
    actions: str
    description: Optional[str]


class AddressObjectData(BaseModel):
    source: str
    name: str
    value: str
    type: str


class AddressGroupData(BaseModel):
    source: str
    name: str
    description: Optional[str]
    static_value: List[str]


# ----------------------------------------------------------------------------
# Function to parse command line arguments
# ----------------------------------------------------------------------------
def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Export security rules and associated Security Profile Groups to a CSV file."
    )
    parser.add_argument(
        "--pan-url",
        dest="pan_url",
        default=pan_config["pan_url"],
        help="Panorama URL (default: %(default)s)",
    )
    parser.add_argument(
        "--pan-token",
        dest="pan_token",
        default=pan_config["pan_token"],
        help="Panorama API token (default: %(default)s)",
    )
    parser.add_argument(
        "--client-id",
        dest="client_id",
        default=prisma_config["client_id"],
        help="Prisma Access Client ID (default: %(default)s)",
    )
    parser.add_argument(
        "--client-secret",
        dest="client_secret",
        default=prisma_config["client_secret"],
        help="Prisma Access Client Secret (default: %(default)s)",
    )
    parser.add_argument(
        "--tenant",
        dest="tsg_id",
        default=prisma_config["tenant"],
        help="Prisma Access Tenant Service Group ID (default: %(default)s)",
    )
    parser.add_argument(
        "--token-url",
        dest="token_url",
        default=prisma_config["token_url"],
        help="Prisma Access Token URL (default: %(default)s)",
    )
    return parser.parse_args()


# ----------------------------------------------------------------------------
# Function to create and return an instance of Panorama
# ----------------------------------------------------------------------------
def setup_panorama_client(pan_url: str, pan_token: str) -> Panorama:
    return Panorama(hostname=pan_url, api_key=pan_token)


# ----------------------------------------------------------------------------
# Function to fetch security rules
# ----------------------------------------------------------------------------
def get_security_rules(pan: Panorama) -> List[SecurityRuleData]:
    pre_rulebase = PreRulebase()
    post_rulebase = PostRulebase()

    pan.add(pre_rulebase)
    pan.add(post_rulebase)

    pre_rules = SecurityRule.refreshall(pre_rulebase)
    post_rules = SecurityRule.refreshall(post_rulebase)

    rules = pre_rules + post_rules

    rules_data = []
    for rule in rules:
        rule_data = SecurityRuleData(
            rule_name=rule.name,
            security_profile_group=rule.group if rule.group else None,
            source_zones=rule.fromzone,
            destination_zones=rule.tozone,
            source_addresses=rule.source,
            destination_addresses=rule.destination,
            applications=rule.application,
            services=rule.service,
            actions=rule.action,
            description=rule.description,
        )
        rules_data.append(rule_data)

    return rules_data


# ----------------------------------------------------------------------------
# Function to fetch address objects and groups
# ----------------------------------------------------------------------------
def get_address_objects_and_groups(
    pan: Panorama,
) -> Tuple[List[AddressObjectData], List[AddressGroupData]]:
    pan_address_objects = AddressObject.refreshall(pan)
    logging.debug(pan_address_objects)

    pan_address_groups = AddressGroup.refreshall(pan)
    logging.debug(pan_address_groups)

    address_objects = []
    address_groups = []

    for each in pan_address_objects:
        address_objects.append(
            AddressObjectData(
                source="Shared", name=each.name, value=each.value, type=each.type
            )
        )

    for each in pan_address_groups:
        if each.static_value:
            if not each.description:
                each.description = ""
            address_groups.append(
                AddressGroupData(
                    source="Shared",
                    name=each.name,
                    description=each.description,
                    static_value=each.static_value,
                )
            )

    device_groups = DeviceGroup.refreshall(pan)

    for dg in device_groups:
        dg_address_objects = AddressObject.refreshall(dg)
        for each in dg_address_objects:
            address_objects.append(
                AddressObjectData(
                    source=dg.name, name=each.name, value=each.value, type=each.type
                )
            )

        dg_address_groups = AddressGroup.refreshall(dg)
        for each in dg_address_groups:
            if each.static_value:
                if not each.description:
                    each.description = ""
                address_groups.append(
                    AddressGroupData(
                        source=dg.name,
                        name=each.name,
                        description=each.description,
                        static_value=each.static_value,
                    )
                )

    return address_objects, address_groups


# ----------------------------------------------------------------------------
# Function to create Prisma address objects
# ----------------------------------------------------------------------------
def create_prisma_address_objects(
    address_objects: List[AddressObjectData], session: PanApiSession
) -> List[Dict[str, str]]:
    prisma_address_objects = []
    for address_object in address_objects:
        logging.debug(address_object)
        prisma_address = PrismaAddress(
            folder="Shared",
            name=f"{address_object.source}-{address_object.name}",
            ip_netmask=address_object.value,
            description=address_object.type,
        )
        prisma_address.create(session)
        prisma_address_objects.append({
            "folder": prisma_address.folder,
            "name": prisma_address.name,
            "ip_netmask": prisma_address.ip_netmask,
            "description": prisma_address.description,
        })
    return prisma_address_objects


# ----------------------------------------------------------------------------
# Main execution of our script
# ----------------------------------------------------------------------------
def run_panorama_to_prisma(
    pan_url: str, pan_token: str, client_id: str, client_secret: str, tsg_id: str, token_url: str
) -> Dict[str, Any]:

    # authenticate with Panorama
    logging.info("Authenticating with Panorama...")
    pan = setup_panorama_client(pan_url, pan_token)

    try:
        logging.info("Retrieving security rules...")
        rules = get_security_rules(pan)
    except Exception as e:
        logging.error("Error retrieving security rules: %s", e)
        return

    for rule_data in rules:
        logging.debug(rule_data.json(indent=2))

    try:
        logging.info("Retrieving address objects and groups...")
        address_objects, address_groups = get_address_objects_and_groups(pan)
    except Exception as e:
        logging.error("Error retrieving address objects and groups: %s", e)
        return

    for address_object in address_objects:
        logging.debug(address_object.json(indent=2))

    for address_group in address_groups:
        logging.debug(address_group.json(indent=2))

    # authenticate with Prisma
    try:
        session = PanApiSession()
        logging.info("Authenticating with Prisma Access...")
        logging.debug(f"client_id: {client_id}")
        logging.debug(f"client_secret: {client_secret}")
        logging.debug(f"tsg_id: {tsg_id}")
        logging.debug(f"token_url: {token_url}")

        session.authenticate(
            client_id=client_id,
            client_secret=client_secret,
            scope=f"profile tsg_id:{tsg_id} email",
            token_url=token_url,
        )
    except Exception as e:
        logging.error(f"Error with Prisma authentication: {e}")
        return {"error": str(e)}

    # Create Prisma address objects
    try:
        logging.info("Creating Prisma address objects...")
        prisma_address_objects = create_prisma_address_objects(address_objects, session)
    except Exception as e:
        logging.error(f"Error with Prisma API calls: {e}")
        return {"error": str(e)}

    logging.info("Completed job successfully!")
    return {
        "panorama_address_objects": [ao.dict() for ao in address_objects],
        "prisma_address_objects": prisma_address_objects,
    }


# ----------------------------------------------------------------------------
# Execute main function
# ----------------------------------------------------------------------------
if __name__ == "__main__":
    args = parse_arguments()
    result = run_panorama_to_prisma(
        args.pan_url,
        args.pan_token,
        args.client_id,
        args.client_secret,
        args.tsg_id,
        args.token_url,
    )
    logging.debug(result)
