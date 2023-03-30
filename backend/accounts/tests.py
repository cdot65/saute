from django.contrib.auth import get_user_model, authenticate
from django.test import TestCase
from django.urls import reverse


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
    username = "newuser"
    email = "newuser@email.com"

    def setUp(self):
        url = reverse("account_signup")
        self.response = self.client.get(url)

    def test_signup_template(self):
        self.assertEqual(self.response.status_code, 200)
        self.assertTemplateUsed(self.response, "account/signup.html")
        self.assertContains(self.response, "Sign Up")

    def test_signup_form(self):
        new_user = get_user_model().objects.create_user(self.username, self.email)
        self.assertEqual(get_user_model().objects.all().count(), 1)
        created_user = get_user_model().objects.all()[0]
        self.assertEqual(created_user.username, new_user.username)
        self.assertEqual(created_user.email, new_user.email)

    def test_authenticate_user(self):
        password = "testpassword"
        new_user = get_user_model().objects.create_user(
            self.username, self.email, password
        )
        authenticated_user = authenticate(username=self.username, password=password)
        self.assertTrue(authenticated_user is not None)
        self.assertEqual(authenticated_user.username, new_user.username)
        self.assertEqual(authenticated_user.email, new_user.email)
