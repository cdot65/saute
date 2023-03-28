from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse, resolve

from .forms import CustomUserCreationForm
from .views import SignupPageView


class CustomUserTests(TestCase):
    def test_create_user(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(
            username="testuser", email="test@example.com", password="testpassword"
        )
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.email, "test@example.com")
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)

        try:
            # Check if the password is stored hashed, not as plain text
            self.assertNotEqual(user.password, "testpassword")
        except AttributeError:
            self.fail("Password is not hashed.")

    def test_create_superuser(self):
        user_model = get_user_model()
        user = user_model.objects.create_superuser(
            username="testsuperuser",
            email="testsuper@example.com",
            password="testpassword",
        )
        self.assertEqual(user.username, "testsuperuser")
        self.assertEqual(user.email, "testsuper@example.com")
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_active)

        try:
            # Check if the password is stored hashed, not as plain text
            self.assertNotEqual(user.password, "testpassword")
        except AttributeError:
            self.fail("Password is not hashed.")


class SignUpPageTests(TestCase):
    def setUp(self):
        url = reverse("signup")
        self.response = self.client.get(url)

    def test_signup_template(self):
        self.assertTemplateUsed(self.response, "registration/signup.html")

    def test_signup_form(self):
        form = self.response.context.get("form")
        self.assertIsInstance(form, CustomUserCreationForm)
        self.assertContains(self.response, "csrfmiddlewaretoken")

    def test_signup_view(self):
        view = resolve("/accounts/signup/")
        self.assertEqual(view.func.view_class, SignupPageView)
