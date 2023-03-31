from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from accounts.views import CustomConfirmEmailView

urlpatterns = [
    # django admin
    path("admin/", admin.site.urls),
    # user management
    path("accounts/", include("allauth.urls")),
    # local apps
    path("panosync/", include("panosync.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path(
        "api/v1/dj-rest-auth/registration/account-confirm-email/<str:key>/",
        CustomConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path("api/v1/dj-rest-auth/", include("dj_rest_auth.urls")),
    path("api/v1/", include("api.urls")),
    path("", include("pages.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
