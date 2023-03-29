from django.test import TestCase
from django.urls import reverse
from .models import Prisma, Panorama


class PanoramaTests(TestCase):
    def test_panorama_creation(self):
        panorama = Panorama.objects.create(
            hostname="test.panorama.com",
            ipv4_address="192.168.1.1",
            ipv6_address="2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            api_token="1234567890abcdef",
        )
        self.assertEqual(panorama.hostname, "test.panorama.com")

    def test_panorama_list_view(self):
        panorama = Panorama.objects.create(
            hostname="panorama1",
            ipv4_address="192.168.1.1",
            api_token="test_token",
        )
        response = self.client.get(reverse("panorama_list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "panosync/panorama_list.html")
        self.assertTrue("panorama_list" in response.context)
        self.assertTrue(panorama in response.context["panorama_list"])


class PrismaTests(TestCase):
    def test_prisma_creation(self):
        prisma = Prisma.objects.create(
            client_id="test-client-id",
            client_secret="test-client-secret",
            name="Test Prisma",
            tsg="Test TSG",
        )
        self.assertEqual(prisma.name, "Test Prisma")

    def test_prisma_list_view(self):
        prisma = Prisma.objects.create(
            name="prisma1",
            tsg="test_tsg",
            client_id="test_client_id",
            client_secret="test_client_secret",
        )
        response = self.client.get(reverse("prisma_list"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "panosync/prisma_list.html")
        self.assertTrue("prisma_list" in response.context)
        self.assertTrue(prisma in response.context["prisma_list"])
