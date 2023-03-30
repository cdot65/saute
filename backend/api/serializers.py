from django.contrib.auth import get_user_model
from rest_framework import serializers

from panosync.models import Panorama, Prisma


class PanoramaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panorama
        fields = (
            "id",
            "hostname",
            "ipv4_address",
            "ipv6_address",
            "api_token",
        )


class PrismaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prisma
        fields = (
            "id",
            "client_id",
            "client_secret",
            "name",
            "tsg",
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "username",
        )
