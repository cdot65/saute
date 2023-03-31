from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.views.generic import ListView, DetailView
from .models import Panorama, Prisma


class PanoramaListView(LoginRequiredMixin, ListView):
    model = Panorama
    template_name = "panosync/panorama_list.html"
    context_object_name = "panorama_list"
    login_url = "account_login"


class PrismaListView(LoginRequiredMixin, ListView):
    model = Prisma
    template_name = "panosync/prisma_list.html"
    context_object_name = "prisma_list"
    login_url = "account_login"


class PanoramaDetailView(LoginRequiredMixin, PermissionRequiredMixin, DetailView):
    model = Panorama
    template_name = "panosync/panorama_detail.html"
    context_object_name = "panorama"
    login_url = "account_login"
    permission_required = "panosync.prisma_full"


class PrismaDetailView(LoginRequiredMixin, PermissionRequiredMixin, DetailView):
    model = Prisma
    template_name = "panosync/prisma_detail.html"
    context_object_name = "prisma"
    login_url = "account_login"
    permission_required = "panosync.prisma_full"
