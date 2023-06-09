from django.urls import path
from rest_framework.routers import SimpleRouter
from .views import (
    MessageViewSet,
    PanoramaViewSet,
    PrismaViewSet,
    FirewallViewSet,
    JobsViewSet,
    ScriptViewSet,
    UserViewSet,
    UserProfileView,
    execute_admin_report,
    execute_assurance_arp_entry,
    execute_assurance_snapshot,
    execute_change_analysis,
    execute_chat,
    execute_create_script,
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
router.register("scripts", ScriptViewSet, basename="scripts")
router.register("ai/messages", MessageViewSet, basename="messages")

urlpatterns = router.urls

urlpatterns += [
    path("user-profile/", UserProfileView.as_view(), name="user_profile"),
    path(
        "ai/change-analysis",
        execute_change_analysis,
        name="execute_change_analysis",
    ),
    path(
        "ai/chat",
        execute_chat,
        name="execute_chat",
    ),
    path(
        "ai/create-script",
        execute_create_script,
        name="execute_create_script",
    ),
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
        "operations/assurance-snapshot",
        execute_assurance_snapshot,
        name="execute_assurance_snapshot",
    ),
    path(
        "report/get-system-info",
        execute_get_system_info,
        name="execute_get_system_info",
    ),
]
