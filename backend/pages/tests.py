from django.test import TestCase
from django.urls import reverse, resolve
from .views import HomePageView, AboutPageView


class StaticPagesTests(TestCase):
    def setUp(self):
        self.home_url = reverse("home")
        self.about_url = reverse("about")

    def test_home_page_status_code(self):
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 200)

    def test_about_page_status_code(self):
        response = self.client.get(self.about_url)
        self.assertEqual(response.status_code, 200)

    def test_home_page_template(self):
        response = self.client.get(self.home_url)
        self.assertTemplateUsed(response, "home.html")

    def test_about_page_template(self):
        response = self.client.get(self.about_url)
        self.assertTemplateUsed(response, "about.html")

    def test_home_page_contains_correct_html(self):
        response = self.client.get(self.home_url)
        self.assertContains(response, "<h1>This is our home page.</h1>")

    def test_about_page_contains_correct_html(self):
        response = self.client.get(self.about_url)
        self.assertContains(response, "<h1>About page.</h1>")

    def test_home_page_does_not_contain_incorrect_html(self):
        response = self.client.get(self.home_url)
        self.assertNotContains(
            response, "Hi there! This text should not be on the page."
        )

    def test_about_page_does_not_contain_incorrect_html(self):
        response = self.client.get(self.about_url)
        self.assertNotContains(
            response, "Hi there! This text should not be on the page."
        )

    def test_home_page_resolves(self):
        resolver = resolve(self.home_url)
        self.assertEqual(resolver.func.__name__, HomePageView.as_view().__name__)

    def test_about_page_resolves(self):
        resolver = resolve(self.about_url)
        self.assertEqual(resolver.func.__name__, AboutPageView.as_view().__name__)
