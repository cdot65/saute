# django imports
from django.contrib.auth import get_user_model
from django.http import JsonResponse

# django rest framework imports
from rest_framework import viewsets, status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import RetrieveAPIView


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
    execute_upload_cert_chain as upload_cert_chain_task,
    execute_sync_to_prisma as sync_to_prisma_task,
    execute_admin_report as admin_report_task,
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

    def retrieve(self, request, pk=None, format=None):
        instance = self.get_object()
        if instance.json_data is None:
            return JsonResponse({}, status=200)

        response_data = {
            "task_id": instance.task_id,
            "job_type": instance.job_type,
            "created_at": instance.created_at.isoformat(),
            "json_data": instance.json_data if instance.json_data is not None else {},
        }

        return JsonResponse(response_data, status=200)


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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserProfileView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


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

    task_id = task.id

    return Response(
        {"message": "Task has been executed", "task_id": task_id},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def execute_upload_cert_chain(request):
    api_token = request.data.get("api_token")
    author_id = request.user.id
    pan_url = request.data.get("pan_url")
    url = request.data.get("url")

    task = upload_cert_chain_task.delay(api_token, author_id, pan_url, url)

    task_id = task.id

    return Response(
        {"message": "Task has been executed", "task_id": task_id},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def execute_sync_to_prisma(request):
    pan_url = request.data.get("pan_url")
    api_token = request.data.get("api_token")
    client_id = request.data.get("client_id")
    client_secret = request.data.get("client_secret")
    tsg_id = request.data.get("tsg_id")
    token_url = request.data.get("token_url")
    author_id = request.user.id

    task = sync_to_prisma_task.delay(
        pan_url,
        api_token,
        client_id,
        client_secret,
        tsg_id,
        token_url,
        author_id,
    )

    task_id = task.id

    return Response(
        {"message": "Task has been executed", "task_id": task_id},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def execute_admin_report(request):
    pan_url = request.data.get("pan_url")
    api_token = request.data.get("api_token")
    to_emails = request.data.get("to_emails")
    author_id = request.user.id

    task = admin_report_task.delay(
        pan_url,
        api_token,
        to_emails,
        author_id,
    )

    task_id = task.id

    return Response(
        {"message": "Task has been executed", "task_id": task_id},
        status=status.HTTP_200_OK,
    )
