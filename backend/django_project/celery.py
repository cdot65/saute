import os

from celery import Celery
from celery.utils.log import get_task_logger
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")

app = Celery("django_project")

app.config_from_object("django.conf:settings", namespace="CELERY")

logger = get_task_logger(__name__)

app.log.setup_logging_subsystem()
app.log.redirect_stdouts_to_logger(logger)
app.log.setup_task_loggers(loglevel="DEBUG")  # Change this to 'INFO' if you prefer

app.autodiscover_tasks()
