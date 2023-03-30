from celery import shared_task

from .models import Panorama, Prisma


@shared_task()
def task_execute():
    print(Panorama.__str__())
    print(Prisma.__str__())
