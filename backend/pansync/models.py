from django.db import models


class Panorama(models.Model):
    hostname = models.CharField(max_length=100)
    ipv4_address = models.GenericIPAddressField()
    ipv6_address = models.GenericIPAddressField()
    api_token = models.CharField(max_length=100)

    def __str__(self):
        return self.hostname


class Prisma(models.Model):
    tenant_name = models.CharField(max_length=100)
    client_id = models.CharField(max_length=100)
    client_secret = models.CharField(max_length=100)
    tsg_id = models.CharField(max_length=100)

    def __str__(self):
        return self.tenant_name


class Jobs(models.Model):
    """
    Database model representing an installed Job class.
    """

    name = models.CharField(max_length=1024)
    description = models.TextField(blank=True)
    result = models.TextField(blank=True)

    def __str__(self):
        return self.name
