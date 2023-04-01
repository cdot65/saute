from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from dj_rest_auth.registration.views import ConfirmEmailView

from panosync.models import Panorama, Prisma
from .permissions import IsAuthorOrReadOnly
from .serializers import PanoramaSerializer, PrismaSerializer, UserSerializer


class PanoramaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Panorama.objects.all()
    serializer_class = PanoramaSerializer


class PrismaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Prisma.objects.all()
    serializer_class = PrismaSerializer


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        try:
            self.object = confirmation = self.get_object()
            confirmation.confirm(self.request)
            return JsonResponse({"detail": "Email successfully confirmed."})
        except Exception as e:
            return JsonResponse({"detail": f"Error. Email could not be confirmed. {e}"})
