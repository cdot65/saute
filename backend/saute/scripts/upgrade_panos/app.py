# standard library imports
import logging
import argparse
from typing import List, Dict
from pydantic import BaseModel, Field

# Palo Alto Networks PAN-OS imports
from panos_upgrade_assurance.check_firewall import CheckFirewall
from panos_upgrade_assurance.firewall_proxy import FirewallProxy

# ----------------------------------------------------------------------------
# Configure logging
# ----------------------------------------------------------------------------
logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s [%(levelname)s] %(message)s"
)


# ----------------------------------------------------------------------------
# Define data models
# ----------------------------------------------------------------------------
class SessionCheck(BaseModel):
    source: str
    destination: str
    dest_port: str


class ArpCheck(BaseModel):
    ip: str


class CheckConfiguration(BaseModel):
    session_exist: SessionCheck = Field(None)
    arp_entry_exist: ArpCheck = Field(None)


# ----------------------------------------------------------------------------
# Function to parse command line arguments
# ----------------------------------------------------------------------------
def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Run readiness checks on the Firewall."
    )
    parser.add_argument(
        "--hostname",
        dest="hostname",
        required=True,
        help="Firewall hostname or IP",
    )
    parser.add_argument(
        "--api-key",
        dest="api_key",
        required=True,
        help="Firewall API key",
    )
    return parser.parse_args()


# ----------------------------------------------------------------------------
# Function to create and return an instance of FirewallProxy
# ----------------------------------------------------------------------------
def setup_firewall_proxy(hostname: str, api_key: str) -> FirewallProxy:
    logging.debug(f"hostname: {hostname}")
    logging.debug(f"api_key: {api_key}")
    return FirewallProxy(hostname=hostname, api_key=api_key)


# ----------------------------------------------------------------------------
# Function to run readiness checks
# ----------------------------------------------------------------------------
def run_readiness_checks(
    firewall: FirewallProxy, checks_configuration: List[CheckConfiguration]
) -> Dict[str, str]:
    # setup CheckFirewall instance
    checks = CheckFirewall(firewall)

    # run checks
    try:
        logging.info("Running readiness checks...")
        results = checks.run_readiness_checks(
            [check.dict(exclude_none=True) for check in checks_configuration]
        )
    except Exception as e:
        logging.error("Error running readiness checks: %s", e)
        return

    logging.info("Completed checks successfully!")
    logging.debug("results: \n%s", results)

    return results


# ----------------------------------------------------------------------------
# Main execution of our script
# ----------------------------------------------------------------------------
def run_upgrade_check(pan_url: str, api_token: str):
    # setup Firewall client
    firewall = setup_firewall_proxy(
        hostname=pan_url,
        api_key=api_token,
    )

    checks_configuration = [
        CheckConfiguration(
            session_exist=SessionCheck(
                source="123.234.123.234", destination="10.0.0.1", dest_port="8080"
            )
        ),
        CheckConfiguration(arp_entry_exist=ArpCheck(ip="10.100.0.1")),
    ]

    results = run_readiness_checks(firewall, checks_configuration)
    return results


# ----------------------------------------------------------------------------
# Execute main function
# ----------------------------------------------------------------------------
if __name__ == "__main__":
    args = parse_arguments()
    result = run_upgrade_check(
        args.pan_url,
        args.api_token,
    )
    logging.debug(result)
