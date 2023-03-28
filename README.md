# 🚀 Prisma Panorama Diffsync

**Warning:** This application is still in development! ⚠️

Prisma Panorama Diffsync is a Django-based web application that allows users to manage their devices and configurations. This application utilizes Django Allauth for authentication and includes features like user login, logout, and signup.

This application is designed to be run as Docker containers using the `docker-compose.yml` file.

## 📦 Project Dependencies

- Docker
- Docker-Compose

## 🛠️ Installation

### Backend

#### Dependencies

- Django 4.1.5
- PostgreSQL
- django-allauth
- django-crispy-forms
- django-crispy-bootstrap5

1. Clone the repository:

    ```bash
    git clone https://github.com/cdot65/prisma-panorama-diffsync.git
    ```

2. Navigate to the project directory:

    ```bash
    cd prisma-panorama-diffsync/backend
    ```

3. Rename the .env_example file to .env and update it with the required environment variables:

    ```bash
    SENDGRID_API_KEY="yourapikey"
    SENDGRID_FROM_EMAIL="user@yourdomain.com"
    DJANGO_SECRET_KEY="yoursecretkey"
    DJANGO_DEBUG=True
    DJANGO_ALLOWED_HOSTS=['localhost', '127.0.0.1', '*']
    DATABASE_URL="postgres://postgres@db/postgres"
    ```

4. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Apply migrations and run the development server:

    ```bash
    python manage.py migrate
    python manage.py runserver
    ```

Now visit http://127.0.0.1:8000 in your web browser to access the application.

### Frontend

- TBD

A separate frontend has yet to be developed. For now, use the backend user interface to interact with the application.

## 🚧 Development

The application is still in development, and more features will be added in the future. Contributions are welcome! 🙌
