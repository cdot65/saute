from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

from panosync.models import Panorama, Prisma


class APITests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = get_user_model().objects.create_user(
            username="testuser@me.com", password="testpassword"
        )
        cls.token = Token.objects.create(user=cls.user)
        cls.panorama = Panorama.objects.create(
            hostname="fake-panorama.example.com",
            ipv4_address="192.168.1.1",
            ipv6_address="2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            api_token="oohsosupersecret",
        )
        cls.prisma = Prisma.objects.create(
            client_id="fakeid@me.com",
            client_secret="oohsosupersecret",
            name="fake-tenant",
            tsg="8675309",
        )

    def setUp(self):
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_panorama_model_content(self):
        self.assertEqual(self.panorama.hostname, "fake-panorama.example.com")
        self.assertEqual(self.panorama.ipv4_address, "192.168.1.1")
        self.assertEqual(
            self.panorama.ipv6_address, "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
        )
        self.assertEqual(self.panorama.api_token, "oohsosupersecret")

    def test_panorama_api_listview(self):
        response = self.client.get(reverse("panorama-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, self.panorama)

    def test_panorama_api_detailview(self):
        response = self.client.get(
            reverse("panorama-detail", kwargs={"pk": self.panorama.id}),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, "fake-panorama.example.com")

    def test_prisma_model_content(self):
        self.assertEqual(self.prisma.client_id, "fakeid@me.com")
        self.assertEqual(self.prisma.client_secret, "oohsosupersecret")
        self.assertEqual(self.prisma.name, "fake-tenant")
        self.assertEqual(self.prisma.tsg, "8675309")

    def test_prisma_api_listview(self):
        response = self.client.get(reverse("prisma-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, self.prisma)

    def test_prisma_api_detailview(self):
        response = self.client.get(
            reverse("prisma-detail", kwargs={"pk": self.prisma.id}),
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, "fake-tenant")
