from django.contrib.auth import get_user_model
from django.test import TestCase


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
