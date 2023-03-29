from django.urls import path
from .views import (
    PanoramaListView,
    PrismaListView,
    PanoramaDetailView,
    PrismaDetailView,
)

urlpatterns = [
    path("panorama/", PanoramaListView.as_view(), name="panorama_list"),
    path("panorama/<uuid:pk>/", PanoramaDetailView.as_view(), name="panorama_detail"),
    path("prisma/", PrismaListView.as_view(), name="prisma_list"),
    path("prisma/<uuid:pk>/", PrismaDetailView.as_view(), name="prisma_detail"),
]
