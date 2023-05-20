from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import (
    PanoramaViewSet,
    PrismaViewSet,
    FirewallViewSet,
    JobsViewSet,
    UserViewSet,
    UserProfileView,
    execute_admin_report,
    execute_assurance_arp_entry,
    execute_get_system_info,
    execute_upload_cert_chain,
    execute_sync_to_prisma,
)

router = SimpleRouter()
router.register("panorama", PanoramaViewSet, basename="panorama")
router.register("prisma", PrismaViewSet, basename="prisma")
router.register("firewall", FirewallViewSet, basename="firewall")
router.register("jobs", JobsViewSet, basename="jobs")
router.register("users", UserViewSet, basename="users")

urlpatterns = router.urls

urlpatterns += [
    path("user-profile/", UserProfileView.as_view(), name="user_profile"),
    path(
        "assessment/admin-report",
        execute_admin_report,
        name="execute_admin_report",
    ),
    path(
        "configuration/sync-to-prisma",
        execute_sync_to_prisma,
        name="execute_sync_to_prisma",
    ),
    path(
        "configuration/upload-cert-chain",
        execute_upload_cert_chain,
        name="execute_upload_cert_chain",
    ),
    path(
        "operations/assurance-arp-entry",
        execute_assurance_arp_entry,
        name="execute_assurance_arp_entry",
    ),
    path(
        "report/get-system-info",
        execute_get_system_info,
        name="execute_get_system_info",
    ),
]
