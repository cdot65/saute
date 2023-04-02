# prisma-panorama-diffsync 🚀

[![Backend CI](https://github.com/cdot65/prisma-panorama-diffsync/actions/workflows/backend.yml/badge.svg)](https://github.com/cdot65/prisma-panorama-diffsync/actions/workflows/backend.yml)

## Table of Contents

- [prisma-panorama-diffsync 🚀](#prisma-panorama-diffsync-)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Dependencies](#project-dependencies)
  - [Backend Overview](#backend-overview)
  - [Frontend Overview](#frontend-overview)
  - [Backend Build and Deploy](#backend-build-and-deploy)
  - [Frontend Build and Deploy](#frontend-build-and-deploy)

## Overview

This project is a web application consisting of a separate backend and frontend. The backend is built using Django and PostgreSQL, while the frontend is developed using Angular. The backend provides a robust REST API, and the frontend consumes this API to provide a seamless user experience.

## Project Dependencies

To work with this project, you'll need to have the following software installed on your system:

- Docker
- Docker Compose
- Python 3.9
- Node.js (for the frontend)

## Backend Overview

The backend of this project is built using Django and Django Rest Framework (DRF). It features a modular architecture with well-structured applications, providing a strong foundation for future development.

Key features of the backend include:

- Django Rest Framework (DRF) for creating a RESTful API
- Django Allauth for user authentication and registration
- PostgreSQL as the database
- A `docker-compose.yml` file to simplify deployment and management of the backend services
- Docker containers for an easy and reproducible deployment process

## Frontend Overview

The frontend of this project is being developed using Angular. Currently, the frontend is still under active development, and as such, you may not find any files within the `frontend/` directory. Once the frontend development is complete, it will provide a seamless user experience while interacting with the backend REST API.

## Backend Build and Deploy

To build and deploy the backend using Docker and Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your system.

2. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

3. Create an .env file and update it accordingly.

    ```sh
    cp .env_example .env
    vim .env
    ```

    ```conf
    DJANGO_ALLOWED_HOSTS=['localhost', '127.0.0.1', '*']
    DJANGO_DEBUG=True
    DJANGO_SECRET_KEY=qKJ9h-ph4VY7zJIQnnRuvR-MARWs-b2tOdRtJZpeXfc
    POSTGRES_USER=django_user
    POSTGRES_PASSWORD=django_password
    POSTGRES_DB=postgres
    POSTGRES_HOST=db
    POSTGRES_PORT=5432
    ```

4. Build the Docker images:

    ```sh
    docker-compose build
    ```

5. Start the services using Docker Compose:

    ```sh
    docker-compose up -d
    ```

6. Wait for the web application to start (you can check the logs to make sure everything is running smoothly):

    ```sh
    docker-compose logs -f
    ```

7. Make database migrations:

    ```sh
    docker-compose exec -T web python manage.py makemigrations
    ```

8. Apply the migrations:

    ```sh
    docker-compose exec -T web python manage.py migrate
    ```

Your backend should now be up and running. 🎉

## Frontend Build and Deploy

The frontend build and deploy steps are still to be determined, as the frontend is under active development. Once the development is complete, this section will be updated with the necessary steps to build and deploy the frontend using the Angular framework. 🛠️
