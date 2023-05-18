# standard library imports
import logging
import argparse
from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field

# third party library imports
from environs import Env
import xml.etree.ElementTree as ET
import xmltodict
import pandas as pd

# Palo Alto Networks PAN-OS imports
from panos.panorama import Panorama

# ----------------------------------------------------------------------------
# Configure logging
# ----------------------------------------------------------------------------
logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s [%(levelname)s] %(message)s"
)

# ----------------------------------------------------------------------------
# Load environment variables from .env file
# ----------------------------------------------------------------------------
env = Env()
env.read_env()

pan_config = {
    "pan_url": env("PANURL", "panorama.redtail.com"),
    "api_token": env("PANTOKEN", "supersecret"),
}


# ----------------------------------------------------------------------------
# Define data models
# ----------------------------------------------------------------------------
class RoleBased(BaseModel):
    superuser: Optional[str]
    panorama_admin: Optional[str]
    superreader: Optional[str]


class Permissions(BaseModel):
    role_based: Optional[RoleBased]


class Entry(BaseModel):
    name: str = Field(alias="@name")
    phash: str
    permissions: Permissions


class Users(BaseModel):
    entry: List[Entry]


class Result(BaseModel):
    total_count: int = Field(alias="@total-count")
    count: int = Field(alias="@count")
    users: Users


class Response(BaseModel):
    status: str = Field(alias="@status")
    code: str = Field(alias="@code")
    result: Result


class AdminList(BaseModel):
    response: Response


# ----------------------------------------------------------------------------
# Function to parse command line arguments
# ----------------------------------------------------------------------------
def parse_arguments():
    parser = argparse.ArgumentParser(
        description="Retrieve list of administrators from Panorama."
    )
    parser.add_argument(
        "--pan-url",
        dest="pan_url",
        default=pan_config["pan_url"],
        help="Panorama URL (default: %(default)s)",
    )
    parser.add_argument(
        "--pan-token",
        dest="api_token",
        default=pan_config["api_token"],
        help="Panorama API token (default: %(default)s)",
    )
    return parser.parse_args()


# ----------------------------------------------------------------------------
# Function to create and return an instance of Panorama
# ----------------------------------------------------------------------------
def setup_panorama_client(pan_url: str, api_token: str) -> Panorama:
    logging.debug(f"pan_url: {pan_url}")
    logging.debug(f"api_token: {api_token}")
    return Panorama(hostname=pan_url, api_key=api_token)


# ----------------------------------------------------------------------------
# Function to fetch administrators
# ----------------------------------------------------------------------------
def get_administrators(pan: Panorama) -> AdminList:
    admin_list = pan.xapi.get(xpath="/config/mgt-config/users")
    xml_str = ET.tostring(admin_list, encoding='utf-8').decode('utf-8')
    data = xmltodict.parse(xml_str)

    admins = AdminList(**data)
    return admins


# ----------------------------------------------------------------------------
# Main execution of our script
# ----------------------------------------------------------------------------
def run_get_admins(
    pan_url: str,
    api_token: str,
) -> Dict[str, Any]:
    # authenticate with Panorama
    logging.info("Authenticating with Panorama...")
    pan = setup_panorama_client(pan_url, api_token)
    logging.debug(pan)

    # fetch administrators
    try:
        logging.info("Retrieving administrators...")
        admins = get_administrators(pan)
        logging.debug(admins)
    except Exception as e:
        logging.error("Error retrieving administrators: %s", e)
        return

    logging.info("Completed job successfully!")
    return admins.dict()


# ----------------------------------------------------------------------------
# Execute main function
# ----------------------------------------------------------------------------
if __name__ == "__main__":
    args = parse_arguments()
    result = run_get_admins(
        args.pan_url,
        args.api_token,
    )
    logging.debug(result)
    # Print the result object to understand its structure
    print(result)

    # Convert the list of Entry objects into a DataFrame
    df = pd.DataFrame(result["response"]["result"]["users"]["entry"])

    # Drop the phash column
    df = df.drop(columns=["phash", "permissions"])

    # Convert the DataFrame into an HTML table
    html_table = df.to_html()

    # Print the HTML table
    logging.debug(html_table)
