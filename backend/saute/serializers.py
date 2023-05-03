from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
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
    task_id = serializers.CharField(read_only=True)  # Add the task_id field

    class Meta:
        model = Jobs
        fields = (
            "task_id",
            "job_type",
            "author",
            "created_at",
            "json_data",
        )


class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "username",
            "email",
            "is_staff",
            "is_superuser",
            "profile_image",
        )
        read_only_fields = ("is_staff", "is_superuser")

    def get_profile_image(self, obj):
        if obj.profile_image:
            return settings.MEDIA_URL + str(obj.profile_image)
        return None
