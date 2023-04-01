from rest_framework import generics

from .models import Panorama, Prisma, Jobs
from .serializers import PanoramaSerializer, PrismaSerializer, JobsSerializer


class PanoramaList(generics.ListCreateAPIView):
    queryset = Panorama.objects.all()
    serializer_class = PanoramaSerializer


class PanoramaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Panorama.objects.all()
    serializer_class = PanoramaSerializer


class PrismaList(generics.ListCreateAPIView):
    queryset = Prisma.objects.all()
    serializer_class = PrismaSerializer


class PrismaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prisma.objects.all()
    serializer_class = PrismaSerializer


class JobsList(generics.ListCreateAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer


class JobsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer
