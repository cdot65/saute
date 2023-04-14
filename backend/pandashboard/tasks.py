import sys
import os
import django

from celery import shared_task
from django.contrib.auth import get_user_model
from pandashboard.models import Jobs

# import our python scripts
from pandashboard.scripts import (
    run_export_rules_to_csv,
    run_get_system_info,
)

sys.path.append("/code/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
django.setup()
User = get_user_model()


@shared_task
def execute_export_rules_to_csv(pan_url, api_token, author_id):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        name=f"Export rules to CSV ({pan_url})",
        description="In progress",
        author=author,  # Replace with the actual user, if available
    )

    try:
        output_filepath = run_export_rules_to_csv(pan_url, api_token)
        job.result = f"Job ID: {job.pk}\nExported to {output_filepath}"
        job.description = "Pass"
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"
        job.description = "Fail"

    # Save the updated job information
    job.save()


@shared_task
def execute_get_system_info(pan_url, api_token, author_id):
    # Retrieve the user object by id
    author = User.objects.get(id=author_id)

    # Create a new Jobs entry
    job = Jobs.objects.create(
        name=f"Retrieve system info ({pan_url})",
        description="In progress",
        author=author,
    )

    try:
        system_info = run_get_system_info(pan_url, api_token)
        job.json_data = system_info
        job.description = "Pass"
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"
        job.description = "Fail"

    # Save the updated job information
    job.save()
