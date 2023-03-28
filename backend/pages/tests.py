from django.test import SimpleTestCase
from django.urls import reverse, resolve
from pages.views import HomePageView


class HomepageTests(SimpleTestCase):
    def setUp(self):
        url = reverse("home")
        self.response = self.client.get(url)

    def test_url_exists_at_correct_location(self):
        self.assertEqual(self.response.status_code, 200)

    def test_homepage_url_name(self):
        self.assertEqual(resolve("/").func.view_class, HomePageView)

    def test_homepage_template(self):
        self.assertTemplateUsed(self.response, "home.html")

    def test_homepage_contains_correct_html(self):
        self.assertContains(self.response, "<h1>This is our home page.</h1>")

    def test_homepage_does_not_contain_incorrect_html(self):
        self.assertNotContains(self.response, "This is some incorrect content.")
