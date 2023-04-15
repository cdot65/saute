from django.conf import settings
from django.db import models


class Panorama(models.Model):
    hostname = models.CharField(max_length=100)
    ipv4_address = models.GenericIPAddressField()
    ipv6_address = models.GenericIPAddressField(protocol="IPv6", blank=True, null=True)
    api_token = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.hostname


class Prisma(models.Model):
    tenant_name = models.CharField(max_length=100)
    client_id = models.CharField(max_length=100)
    client_secret = models.CharField(max_length=100)
    tsg_id = models.CharField(max_length=100)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tenant_name


class Jobs(models.Model):
    task_id = models.CharField(max_length=255, unique=True, primary_key=True)
    job_type = models.CharField(max_length=1024)
    json_data = models.JSONField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Firewall(models.Model):
    hostname = models.CharField(max_length=100)
    ipv4_address = models.GenericIPAddressField()
    ipv6_address = models.GenericIPAddressField(protocol="IPv6", blank=True, null=True)
    api_token = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.hostname