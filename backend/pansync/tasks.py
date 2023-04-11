import sys
import os
import django

from celery import shared_task
from pansync.models import Jobs
from pansync.scripts.export_rules_to_csv import run_export_rules_to_csv

sys.path.append("/code/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
django.setup()


@shared_task
def execute_export_rules_to_csv(pan_url, pan_user, pan_pass):
    # Create a new Jobs entry
    job = Jobs.objects.create(
        name=f"Export rules to CSV ({pan_url})",
        description="In progress",
        author=None,  # Replace with the actual user, if available
    )

    try:
        output_filepath = run_export_rules_to_csv(pan_url, pan_user, pan_pass)
        job.result = f"Job ID: {job.pk}\nExported to {output_filepath}"
        job.description = "Pass"
    except Exception as e:
        job.result = f"Job ID: {job.pk}\nError: {e}"
        job.description = "Fail"

    # Save the updated job information
    job.save()
