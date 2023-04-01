from rest_framework import serializers

from .models import Panorama, Prisma, Jobs


class PanoramaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Panorama
        fields = "__all__"


class PrismaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prisma
        fields = "__all__"


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = "__all__"
