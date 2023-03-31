from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.test import TestCase
from django.urls import reverse

from .models import Prisma, Panorama


class PanoramaTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.create_user(
            username="testuser",
            email="testuser@me.com",
            password="secret",
        )
        cls.special_permission = Permission.objects.get(codename="panorama_full")
        cls.panorama = Panorama.objects.create(
            hostname="test.panorama.com",
            ipv4_address="192.168.1.1",
            ipv6_address="2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            api_token="1234567890abcdef",
        )

    def setUp(self):
        self.client.login(username="testuser", password="secret")

    def test_panorama_creation(self):
        self.assertEqual(f"{self.panorama.hostname}", "test.panorama.com")
        self.assertEqual(f"{self.panorama.ipv4_address}", "192.168.1.1")
        self.assertEqual(
            f"{self.panorama.ipv6_address}", "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
        )
        self.assertEqual(f"{self.panorama.api_token}", "1234567890abcdef")

    def test_panorama_list_view_for_logged_in_user(self):
        response = self.client.get(reverse("panorama_list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "panosync/panorama_list.html")
        self.assertTrue("panorama_list" in response.context)
        self.assertTrue(self.panorama in response.context["panorama_list"])

    def test_panorama_list_view_for_logged_out_user(self):
        self.client.logout()
        response = self.client.get(reverse("panorama_list"))
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(
            response, "%s?next=/panosync/panorama/" % (reverse("account_login"))
        )
        response = self.client.get(
            "%s?next=/panosync/panorama/" % (reverse("account_login")), follow=True
        )
        self.assertContains(response, "Log In")


class PrismaTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.create_user(
            username="testuser",
            email="testuser@me.com",
            password="secret",
        )
        cls.special_permission = Permission.objects.get(codename="prisma_full")
        cls.prisma = Prisma.objects.create(
            client_id="test-client-id",
            client_secret="test-client-secret",
            name="Test Prisma",
            tsg="Test TSG",
        )

    def setUp(self):
        self.client.login(username="testuser", password="secret")

    def test_prisma_creation(self):
        self.assertEqual(f"{self.prisma.client_id}", "test-client-id")
        self.assertEqual(f"{self.prisma.client_secret}", "test-client-secret")
        self.assertEqual(f"{self.prisma.name}", "Test Prisma")
        self.assertEqual(f"{self.prisma.tsg}", "Test TSG")

    def test_prisma_list_view_for_logged_in_user(self):
        response = self.client.get(reverse("prisma_list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "panosync/prisma_list.html")
        self.assertTrue("prisma_list" in response.context)
        self.assertTrue(self.prisma in response.context["prisma_list"])

    def test_prisma_list_view_for_logged_out_user(self):
        self.client.logout()
        response = self.client.get(reverse("prisma_list"))
        self.assertEqual(response.status_code, 302)
        self.assertRedirects(
            response, "%s?next=/panosync/prisma/" % (reverse("account_login"))
        )
        response = self.client.get(
            "%s?next=/panosync/prisma/" % (reverse("account_login")), follow=True
        )
        self.assertContains(response, "Log In")
