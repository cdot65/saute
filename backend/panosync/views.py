from django.views.generic import ListView, DetailView
from .models import Panorama, Prisma


class PanoramaListView(ListView):
    model = Panorama
    template_name = "panosync/panorama_list.html"
    context_object_name = "panorama_list"


class PrismaListView(ListView):
    model = Prisma
    template_name = "panosync/prisma_list.html"
    context_object_name = "prisma_list"


class PanoramaDetailView(DetailView):
    model = Panorama
    template_name = "panosync/panorama_detail.html"
    context_object_name = "panorama"


class PrismaDetailView(DetailView):
    model = Prisma
    template_name = "panosync/prisma_detail.html"
    context_object_name = "prisma"
