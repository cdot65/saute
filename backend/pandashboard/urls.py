from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import (
    PanoramaViewSet,
    PrismaViewSet,
    FirewallViewSet,
    JobsViewSet,
    UserViewSet,
    execute_export_rules_to_csv,
    execute_get_system_info,
)

router = SimpleRouter()
router.register("panorama", PanoramaViewSet, basename="panorama")
router.register("prisma", PrismaViewSet, basename="prisma")
router.register("firewall", FirewallViewSet, basename="firewall")
router.register("jobs", JobsViewSet, basename="jobs")
router.register("users", UserViewSet, basename="users")

urlpatterns = router.urls

urlpatterns += [
    path(
        "report/rules", execute_export_rules_to_csv, name="execute_export_rules_to_csv"
    ),
    path(
        "report/get-system-info",
        execute_get_system_info,
        name="execute_get_system_info",
    ),
]
