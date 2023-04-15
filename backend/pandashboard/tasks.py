import sys
import os
import django

from celery import shared_task, current_task
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
