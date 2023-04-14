# standard library imports
import json

# django imports
from django.contrib.auth import get_user_model
from django.http import JsonResponse

# django rest framework imports
from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

# directory object imports
from .models import Panorama, Prisma, Firewall, Jobs
from .permissions import IsAuthorOrReadOnly
from .serializers import (
    PanoramaSerializer,
    PrismaSerializer,
    FirewallSerializer,
    JobsSerializer,
    UserSerializer,
)

# Python scripts
from .tasks import (
    execute_export_rules_to_csv as export_rules_to_csv_task,
    execute_get_system_info as get_system_info_task,
)


class PanoramaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Panorama.objects.all()
    serializer_class = PanoramaSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=self.request.user)  # Change this line
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PrismaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Prisma.objects.all()
    serializer_class = PrismaSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=self.request.user)  # Change this line
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FirewallViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Firewall.objects.all()
    serializer_class = FirewallSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=self.request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JobsViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Jobs.objects.all()
    serializer_class = JobsSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=self.request.user)  # Change this line
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, format=None):
        instance = self.get_object()
        if instance.json_data is None:
            return JsonResponse({}, status=200)

        try:
            json_data = json.loads(instance.json_data)
        except TypeError as e:
            return JsonResponse({"error": str(e)}, status=400)

        return JsonResponse(json_data, status=200)


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return get_user_model().objects.all()
        else:
            return get_user_model().objects.filter(id=user.id)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def execute_export_rules_to_csv(request):
    pan_url = request.data.get("pan_url")
    api_token = request.data.get("api_token")
    author_id = request.user.id

    task = export_rules_to_csv_task.delay(pan_url, api_token, author_id)

    job_id = task.id

    return Response(
        {"message": "Task has been executed", "job_id": job_id},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def execute_get_system_info(request):
    pan_url = request.data.get("pan_url")
    api_token = request.data.get("api_token")
    author_id = request.user.id

    task = get_system_info_task.delay(pan_url, api_token, author_id)

    job_id = task.id

    return Response(
        {"message": "Task has been executed", "job_id": job_id},
        status=status.HTTP_200_OK,
    )
