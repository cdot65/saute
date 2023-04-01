from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Panorama, Prisma, Jobs


class PansyncModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.panorama = Panorama.objects.create(
            hostname="panorama1",
            ipv4_address="1.1.1.1",
            ipv6_address="::1",
            api_token="1234567890",
        )
        cls.prisma = Prisma.objects.create(
            tenant_name="prisma1",
            client_id="1234567890",
            client_secret="1234567890",
            tsg_id="1234567890",
        )
        cls.job = Jobs.objects.create(
            name="diffsync1",
            description="job1",
            result="pass",
        )

    def test_panorama(self):
        self.assertEqual(self.panorama.__str__(), "panorama1")
        self.assertEqual(self.panorama.hostname, "panorama1")
        self.assertEqual(self.panorama.ipv4_address, "1.1.1.1")
        self.assertEqual(self.panorama.ipv6_address, "::1")
        self.assertEqual(self.panorama.api_token, "1234567890")

    def test_prisma(self):
        self.assertEqual(self.prisma.__str__(), "prisma1")
        self.assertEqual(self.prisma.tenant_name, "prisma1")
        self.assertEqual(self.prisma.client_id, "1234567890")
        self.assertEqual(self.prisma.client_secret, "1234567890")
        self.assertEqual(self.prisma.tsg_id, "1234567890")

    def test_jobs(self):
        self.assertEqual(self.job.__str__(), "diffsync1")
        self.assertEqual(self.job.name, "diffsync1")
        self.assertEqual(self.job.description, "job1")
        self.assertEqual(self.job.result, "pass")

    def test_api_panorama_list_view(self):
        response = self.client.get(reverse("panorama_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["hostname"], "panorama1")
        self.assertEqual(response.data[0]["ipv4_address"], "1.1.1.1")
        self.assertEqual(response.data[0]["ipv6_address"], "::1")
        self.assertEqual(response.data[0]["api_token"], "1234567890")
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, self.panorama)

    def test_api_panorama_detail_view(self):
        response = self.client.get(
            reverse("panorama_detail", kwargs={"pk": self.panorama.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, self.panorama)

    def test_api_prisma_list_view(self):
        response = self.client.get(reverse("prisma_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["tenant_name"], "prisma1")
        self.assertEqual(response.data[0]["client_id"], "1234567890")
        self.assertEqual(response.data[0]["client_secret"], "1234567890")
        self.assertEqual(response.data[0]["tsg_id"], "1234567890")
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, self.prisma)

    def test_api_prisma_detail_view(self):
        response = self.client.get(
            reverse("prisma_detail", kwargs={"pk": self.prisma.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, self.prisma)

    def test_api_jobs_list_view(self):
        response = self.client.get(reverse("jobs_list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "diffsync1")
        self.assertEqual(response.data[0]["description"], "job1")
        self.assertEqual(response.data[0]["result"], "pass")
        self.assertEqual(Jobs.objects.count(), 1)
        self.assertContains(response, self.job)

    def test_api_jobs_detail_view(self):
        response = self.client.get(
            reverse("jobs_detail", kwargs={"pk": self.job.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Jobs.objects.count(), 1)
        self.assertContains(response, self.job)
