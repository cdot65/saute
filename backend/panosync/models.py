import uuid
from django.db import models
from django.urls import reverse


class Panorama(models.Model):
    """Panorama model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hostname = models.CharField(max_length=255, unique=True)
    ipv4_address = models.GenericIPAddressField(protocol="IPv4", blank=True, null=True)
    ipv6_address = models.GenericIPAddressField(protocol="IPv6", blank=True, null=True)
    api_token = models.CharField(max_length=255)
    image = models.ImageField(upload_to="panorama_images", blank=True, null=True)

    class Meta:
        permissions = [("panorama_full", "Can read all Panorama instance details")]

    def __str__(self):
        return self.hostname

    def get_absolute_url(self):
        return reverse("panorama_detail", args=[str(self.id)])


class Prisma(models.Model):
    """Prisma model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_id = models.CharField(max_length=255)
    client_secret = models.CharField(max_length=255)
    name = models.CharField(max_length=255, unique=True)
    tsg = models.CharField(max_length=255)
    image = models.ImageField(upload_to="prisma_images", blank=True, null=True)

    class Meta:
        permissions = [("prisma_full", "Can read all Prisma tenant details")]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("prisma_detail", args=[str(self.id)])
