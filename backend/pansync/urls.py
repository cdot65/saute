from django.urls import path

from .views import (
    PanoramaList,
    PanoramaDetail,
    PrismaList,
    PrismaDetail,
    JobsList,
    JobsDetail,
)

urlpatterns = [
    path("panorama/", PanoramaList.as_view(), name="panorama_list"),
    path("panorama/<int:pk>/", PanoramaDetail.as_view(), name="panorama_detail"),
    path("prisma/", PrismaList.as_view(), name="prisma_list"),
    path("prisma/<int:pk>/", PrismaDetail.as_view(), name="prisma_detail"),
    path("jobs/", JobsList.as_view(), name="jobs_list"),
    path("jobs/<int:pk>/", JobsDetail.as_view(), name="jobs_detail"),
]
