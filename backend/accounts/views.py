from dj_rest_auth.registration.views import ConfirmEmailView
from django.http import JsonResponse


class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        try:
            self.object = confirmation = self.get_object()
            confirmation.confirm(self.request)
            return JsonResponse({"detail": "Email successfully confirmed."})
        except Exception as e:
            return JsonResponse({"detail": f"Error. Email could not be confirmed. {e}"})
