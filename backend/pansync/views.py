from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser

from .models import Panorama, Prisma, Jobs
from .permissions import IsAuthorOrReadOnly
from .serializers import (
    PanoramaSerializer,
    PrismaSerializer,
    JobsSerializer,
    UserSerializer,
)


class PanoramaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Panorama.objects.all()
    serializer_class = PanoramaSerializer


class PrismaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Prisma.objects.all()
    serializer_class = PrismaSerializer


class JobsViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
