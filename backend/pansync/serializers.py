from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Panorama, Prisma, Firewall, Jobs


class PanoramaSerializer(serializers.ModelSerializer):
    ipv6_address = serializers.IPAddressField(
        protocol="IPv6",
        allow_blank=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Panorama
        fields = (
            "id",
            "hostname",
            "ipv4_address",
            "ipv6_address",
            "api_token",
            "author",
            "created_at",
        )


class PrismaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prisma
        fields = (
            "id",
            "tenant_name",
            "client_id",
            "client_secret",
            "tsg_id",
            "author",
            "created_at",
        )


class FirewallSerializer(serializers.ModelSerializer):
    ipv6_address = serializers.IPAddressField(
        protocol="IPv6",
        allow_blank=True,
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Firewall
        fields = (
            "id",
            "hostname",
            "ipv4_address",
            "ipv6_address",
            "api_token",
            "author",
            "created_at",
        )


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = (
            "id",
            "name",
            "description",
            "result",
            "author",
            "created_at",
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username", "email", "is_staff", "is_superuser")
        read_only_fields = ("is_staff", "is_superuser")
