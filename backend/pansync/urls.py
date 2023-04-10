from rest_framework.routers import SimpleRouter
from .views import (
    PanoramaViewSet,
    PrismaViewSet,
    FirewallViewSet,
    JobsViewSet,
    UserViewSet,
)

router = SimpleRouter()
router.register("panorama", PanoramaViewSet, basename="panorama")
router.register("prisma", PrismaViewSet, basename="prisma")
router.register("firewalls", FirewallViewSet, basename="firewalls")
router.register("jobs", JobsViewSet, basename="jobs")
router.register("users", UserViewSet, basename="users")

urlpatterns = router.urls
