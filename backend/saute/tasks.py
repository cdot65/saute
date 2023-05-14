import sys
import os
import django
import logging

from celery import shared_task
from django.contrib.auth import get_user_model
from saute.models import Jobs

# import our python scripts
from saute.scripts import (
    run_export_rules_to_csv,
    run_get_system_info,
    run_sync_to_prisma,
    run_upload_cert_chain,
)

# ----------------------------------------------------------------------------
# Configure logging
# ----------------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s"
)

sys.path.append("/code/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
django.setup()
User = get_user_model()


@shared_task(bind=True)  # Add bind=True to access task instance
def execute_export_rules_to_csv(self, pan_url, api_token, author_id):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        job_type="export_rules_to_csv",
        json_data=None,
        author=author,
        task_id=self.request.id,  # Set the task_id field in the Jobs entry
    )

    try:
        output_filepath = run_export_rules_to_csv(pan_url, api_token)
        job.result = f"Job ID: {job.pk}\nExported to {output_filepath}"
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"

    # Save the updated job information
    job.save()


@shared_task(bind=True)  # Add bind=True to access task instance
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


@shared_task(bind=True)  # Add bind=True to access task instance
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


@shared_task(bind=True)  # Add bind=True to access task instance
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
