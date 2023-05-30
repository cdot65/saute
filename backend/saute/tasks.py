import sys
import os
import django
import logging

from celery import shared_task
from django.contrib.auth import get_user_model
from saute.models import Jobs

# third party library imports
from environs import Env

# import our python scripts
from saute.scripts import (
    run_admin_report,
    run_assurance,
    run_create_script,
    run_export_rules_to_csv,
    run_get_system_info,
    run_sync_to_prisma,
    run_upload_cert_chain,
)

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

sendgrid_api_key = env(
    "SENDGRID_API_KEY",
    "go to https://docs.sendgrid.com/ui/account-and-settings/api-keys",
)

sys.path.append("/code/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
django.setup()
User = get_user_model()


# ----------------------------------------------------------------------------
# Export Security Rules to CSV file
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_export_rules_to_csv(self, pan_url, api_token, author_id):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        job_type="export_rules_to_csv",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )

    try:
        output_filepath = run_export_rules_to_csv(pan_url, api_token)
        job.result = f"Job ID: {job.pk}\nExported to {output_filepath}"
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Get Panorama System Info
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_get_system_info(self, pan_url, api_token, author_id):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        job_type="get_system_info",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )

    try:
        system_info = run_get_system_info(pan_url, api_token)
        job.json_data = system_info
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Retrieve and upload Certificate Chain
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_upload_cert_chain(self, api_token, author_id, pan_url, url):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        author=author,
        job_type="upload_cert_chain",
        json_data=None,
        task_id=self.request.id,
    )

    try:
        json_object = run_upload_cert_chain(pan_url, api_token, url)
        job.json_data = json_object
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Sync Panorama to Prisma
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_sync_to_prisma(
    self,
    pan_url,
    api_token,
    client_id,
    client_secret,
    tsg_id,
    token_url,
    author_id,
):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        job_type="sync_to_prisma",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )

    try:
        json_report = run_sync_to_prisma(
            pan_url, api_token, client_id, client_secret, tsg_id, token_url
        )
        job.json_data = json_report
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Report of Administrators
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_admin_report(
    self,
    pan_url,
    api_token,
    to_emails,
    author_id,
):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        job_type="admin_report",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )
    logging.info(f"Job ID: {job.pk}")

    try:
        json_report = run_admin_report(pan_url, api_token, to_emails, sendgrid_api_key)
        logging.info(json_report)
        job.json_data = json_report
        logging.info(job)
    except Exception as e:
        logging.error(e)
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Assurance: Check for ARP entry
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_assurance_arp_entry(
    self,
    hostname,
    api_key,
    operation_type,
    action,
    config,
    author_id,
):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new entry in our Jobs database table
    job = Jobs.objects.create(
        job_type="assurance_arp_entry",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )
    logging.debug(f"Job ID: {job.pk}")

    # Execute the assurance check
    try:
        json_report = run_assurance(
            hostname,
            api_key,
            operation_type,
            action,
            config,
        )

        # logging.debug(json_report)
        job.json_data = json_report
        logging.debug(job)

    except Exception as e:
        logging.error(e)
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# Assurance: Snapshot
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_assurance_snapshot(
    self,
    hostname,
    api_key,
    operation_type,
    action,
    config,
    author_id,
):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new entry in our Jobs database table
    job = Jobs.objects.create(
        job_type="assurance_snapshot",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )
    logging.debug(f"Job ID: {job.pk}")

    # Execute the assurance check
    try:
        json_report = run_assurance(
            hostname,
            api_key,
            operation_type,
            action,
            config,
        )

        # logging.debug(json_report)
        job.json_data = json_report
        logging.debug(job)

    except Exception as e:
        logging.error(e)
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


# ----------------------------------------------------------------------------
# AI: Create Script with ChatGPT
# ----------------------------------------------------------------------------
@shared_task(bind=True)
def execute_create_script(
    self,
    message,
    language,
    target,
    author_id,
):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new entry in our Jobs database table
    job = Jobs.objects.create(
        job_type="create_script",
        json_data=None,
        author=author,
        task_id=self.request.id,
    )
    logging.debug(f"Job ID: {job.pk}")

    # Execute the assurance check
    try:
        result = run_create_script(
            message,
            language,
            target,
        )

        # logging.debug(result)
        job.json_data = result["choices"][0]["message"]["content"]
        logging.debug(job)

    except Exception as e:
        logging.error(e)
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()
