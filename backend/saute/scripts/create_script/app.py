# standard library imports
import logging
import argparse
from typing import Dict, Union

# OpenAI and PAN-OS imports
import openai
from environs import Env
from pydantic import BaseModel

# Local prompt file imports
from prompts import python_panorama_system_request

# ----------------------------------------------------------------------------
# Define workflows
# ----------------------------------------------------------------------------
READINESS_CHECKS = [
    "pan_os",
    "panorama",
    "prisma_access",
    "prisma_cloud",
]

# ----------------------------------------------------------------------------
# Define logging levels
# ----------------------------------------------------------------------------
LOGGING_LEVELS = {
    "debug": logging.DEBUG,
    "info": logging.INFO,
    "warning": logging.WARNING,
    "error": logging.ERROR,
    "critical": logging.CRITICAL,
}


# ----------------------------------------------------------------------------
# Define targets
# ----------------------------------------------------------------------------
TARGETS = [
    "pan_os",
    "panorama",
    "prisma_access",
    "prisma_cloud",
]


# ----------------------------------------------------------------------------
# Define models
# ----------------------------------------------------------------------------
class Args(BaseModel):
    language: str = "python"
    message: str
    target: str = "panorama"
    log_level: str = "debug"


# ----------------------------------------------------------------------------
# Parse arguments
# ----------------------------------------------------------------------------
def parse_arguments() -> Args:
    """
    Parse command line arguments and returns a Namespace object with arguments as attributes.

    The --config argument should be a string that represents a Python dictionary.
    This function converts the string to a dictionary using ast.literal_eval().

    Returns:
        argparse.Namespace: Namespace object with arguments as attributes

    Raises:
        argparse.ArgumentError: If --config argument is not a valid dictionary string.
    """
    parser = argparse.ArgumentParser(description="Request ChatGPT to create script.")
    parser.add_argument(
        "--language",
        dest="language",
        default="python",
        help="The language to request ChatGPT to use to create the script",
    )

    parser.add_argument(
        "--message",
        dest="message",
        required=True,
        help="The message to user's request",
    )

    parser.add_argument(
        "--target",
        dest="target",
        default="panorama",
        help="Palo Alto Networks product to target",
    )

    parser.add_argument(
        "--log-level",
        dest="log_level",
        choices=LOGGING_LEVELS.keys(),
        default="debug",
        help="Set the logging output level",
    )

    args = parser.parse_args()

    # Return an instance of Args model
    return Args(
        language=args.language,
        message=args.message,
        target=args.target,
        log_level=args.log_level,
    )


# ----------------------------------------------------------------------------
# Setup OpenAI API key
# ----------------------------------------------------------------------------
def setup_openai_api_key(api_key: str) -> None:
    """
    Set the OpenAI API key.

    Args:
        api_key (str): OpenAI API key
    """
    logging.debug(f"api_key: {api_key}")
    openai.api_key = api_key


# ----------------------------------------------------------------------------
# Run operations
# ----------------------------------------------------------------------------
def run_create_script(
    language: str,
    message: str,
    target: str,
    openai_config: Dict[str, str],
) -> Union[Dict[str, Union[str, int, float, bool]], None]:
    """
    Request ChatGPT to create a script and return the result of the operation.

    Args:
        language (str): Language for the ChatGPT script
        message (str): User's request
        target (str): Palo Alto Networks product to target
        openai_config (dict): OpenAI configuration settings

    Returns:
        dict: Result of the operation
        None: If target is invalid
    """
    # setup OpenAI API key
    setup_openai_api_key(
        api_key=openai_config["api_key"],
    )

    results = None

    if language == "Python":
        if target not in TARGETS:
            logging.error(f"Invalid target for automation: {target}")
            return
        logging.info(f"Performing readiness check: {target}")

        try:
            logging.info("Running request to ChatGPT...")
            results = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": f"{python_panorama_system_request}.",
                    },
                    {"role": "user", "content": message},
                ],
                **openai_config,
            )
            logging.info("ChatGPT request completed.")
        except Exception as e:
            logging.error(f"ChatGPT request failed with exception: {e}")
            return

    else:
        logging.error(f"Invalid readiness check target: {target}")
        return

    return results


# ----------------------------------------------------------------------------
# Initialize
# ----------------------------------------------------------------------------
if __name__ == "__main__":
    # Get environment variables
    env = Env()
    env.read_env()

    # Parse arguments
    args = parse_arguments()

    # Configure logging
    logging.basicConfig(level=LOGGING_LEVELS[args.log_level])

    # Run script
    result = run_create_script(
        language=args.language,
        message=args.message,
        target=args.target,
        openai_config={
            "api_key": env("OPENAI_API_KEY"),
            "temperature": env.float("OPENAI_TEMPERATURE", 0.6),
            "max_tokens": env.int("OPENAI_MAX_TOKENS", 4096),
        },
    )
    logging.info(f'Result: {result["choices"][0]["message"]}')
