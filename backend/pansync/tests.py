from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .models import Panorama, Prisma, Jobs


User = get_user_model()


class PansyncModelTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            username="testuser", email="test@email.com", password="secret"
        )
        cls.panorama = Panorama.objects.create(
            hostname="panorama1",
            ipv4_address="1.1.1.1",
            ipv6_address="::1",
            api_token="1234567890",
            author=cls.user,
        )
        cls.prisma = Prisma.objects.create(
            tenant_name="prisma1",
            client_id="1234567890",
            client_secret="1234567890",
            tsg_id="1234567890",
            author=cls.user,
        )
        cls.job = Jobs.objects.create(
            name="diffsync1",
            description="job1",
            result="pass",
            author=cls.user,
        )

    def setUp(self):
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

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
        response = self.client.get(reverse("panorama-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["hostname"], "panorama1")
        self.assertEqual(response.data[0]["ipv4_address"], "1.1.1.1")
        self.assertEqual(response.data[0]["ipv6_address"], "::1")
        self.assertEqual(response.data[0]["api_token"], "1234567890")
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, self.panorama)

    def test_api_panorama_detail_view(self):
        response = self.client.get(
            reverse("panorama-detail", kwargs={"pk": self.panorama.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Panorama.objects.count(), 1)
        self.assertContains(response, self.panorama)

    # Panorama API tests
    def test_api_panorama_create(self):
        data = {
            "hostname": "panorama2",
            "ipv4_address": "2.2.2.2",
            "ipv6_address": "::2",
            "api_token": "0987654321",
            "author": self.user.id,
        }
        response = self.client.post(reverse("panorama-list"), data, format="json")
        panorama = Panorama.objects.get(hostname="panorama2")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Panorama.objects.count(), 2)
        self.assertEqual(panorama.hostname, "panorama2")

    def test_api_panorama_update(self):
        data = {"hostname": "updated_panorama"}
        response = self.client.patch(
            reverse("panorama-detail", kwargs={"pk": self.panorama.id}),
            data,
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            Panorama.objects.get(id=self.panorama.id).hostname, "updated_panorama"
        )

    def test_api_panorama_delete(self):
        response = self.client.delete(
            reverse("panorama-detail", kwargs={"pk": self.panorama.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Panorama.objects.count(), 0)

    def test_api_prisma_list_view(self):
        response = self.client.get(reverse("prisma-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["tenant_name"], "prisma1")
        self.assertEqual(response.data[0]["client_id"], "1234567890")
        self.assertEqual(response.data[0]["client_secret"], "1234567890")
        self.assertEqual(response.data[0]["tsg_id"], "1234567890")
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, self.prisma)

    def test_api_prisma_detail_view(self):
        response = self.client.get(
            reverse("prisma-detail", kwargs={"pk": self.prisma.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Prisma.objects.count(), 1)
        self.assertContains(response, self.prisma)

    # Prisma API tests
    def test_api_prisma_create(self):
        data = {
            "tenant_name": "prisma2",
            "client_id": "2345678901",
            "client_secret": "2345678901",
            "tsg_id": "2345678901",
            "author": self.user.id,
        }
        response = self.client.post(reverse("prisma-list"), data, format="json")
        prisma = Prisma.objects.get(tenant_name="prisma2")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Prisma.objects.count(), 2)
        self.assertEqual(prisma.tenant_name, "prisma2")

    def test_api_prisma_update(self):
        data = {"tenant_name": "updated_prisma"}
        response = self.client.patch(
            reverse("prisma-detail", kwargs={"pk": self.prisma.id}), data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            Prisma.objects.get(id=self.prisma.id).tenant_name, "updated_prisma"
        )

    def test_api_prisma_delete(self):
        response = self.client.delete(
            reverse("prisma-detail", kwargs={"pk": self.prisma.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Prisma.objects.count(), 0)

    def test_api_jobs_list_view(self):
        response = self.client.get(reverse("jobs-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "diffsync1")
        self.assertEqual(response.data[0]["description"], "job1")
        self.assertEqual(response.data[0]["result"], "pass")
        self.assertEqual(Jobs.objects.count(), 1)
        self.assertContains(response, self.job)

    def test_api_jobs_detail_view(self):
        response = self.client.get(
            reverse("jobs-detail", kwargs={"pk": self.job.id}), format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Jobs.objects.count(), 1)
        self.assertContains(response, self.job)

    # Jobs API tests
    def test_api_jobs_create(self):
        data = {
            "name": "diffsync2",
            "description": "job2",
            "result": "fail",
            "author": self.user.id,
        }
        response = self.client.post(reverse("jobs-list"), data, format="json")
        job = Jobs.objects.get(name="diffsync2")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Jobs.objects.count(), 2)
        self.assertEqual(job.name, "diffsync2")

    def test_api_jobs_update(self):
        data = {
            "name": "updated_diffsync",
            "result": "pass",
        }
        response = self.client.patch(
            reverse("jobs-detail", kwargs={"pk": self.job.id}), data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Jobs.objects.get(id=self.job.id).name, "updated_diffsync")
        self.assertEqual(Jobs.objects.get(id=self.job.id).result, "pass")

    def test_api_jobs_delete(self):
        response = self.client.delete(
            reverse("jobs-detail", kwargs={"pk": self.job.id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Jobs.objects.count(), 0)


class UserRegistrationTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        response = self.client.post(
            "/api/v1/dj-rest-auth/registration/",
            {
                "username": "testuser",
                "email": "test@example.com",
                "password1": "testpassword",
                "password2": "testpassword",
            },
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username="testuser").exists())


class UserAPITokenTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", password="testpassword", email="test@example.com"
        )

    def test_retrieve_api_token(self):
        self.client.login(username="testuser", password="testpassword")
        response = self.client.post(
            "/api/v1/dj-rest-auth/login/",
            {"username": "testuser", "password": "testpassword"},
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("key", response.data)


class UserLoginTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", password="testpassword", email="test@example.com"
        )

    def test_login_to_drf_api(self):
        response = self.client.get(reverse("panorama-list"))

        response = self.client.post(
            reverse("rest_login"),
            {
                "username": "testuser",
                "password": "testpassword",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("key", response.data)
