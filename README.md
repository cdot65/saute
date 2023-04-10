# Prisma Panorama DiffSync 🚀🌐

[![Build and Deploy](https://github.com/cdot65/pan-dashboard/actions/workflows/backend.yml/badge.svg)](https://github.com/cdot65/pan-dashboard/actions/workflows/backend.yml)

## Table of Contents

- [Prisma Panorama DiffSync 🚀🌐](#prisma-panorama-diffsync-)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Backend Overview](#backend-overview)
  - [Frontend Overview](#frontend-overview)
  - [Project Dependencies](#project-dependencies)
  - [Deployment Steps](#deployment-steps)
  - [Technical Features](#technical-features)
    - [Backend Features](#backend-features)
    - [Frontend Features](#frontend-features)
  - [Working with the Backend Application](#working-with-the-backend-application)
    - [Django Admin Panel](#django-admin-panel)
    - [Important API Endpoints](#important-api-endpoints)
  - [Working with the Frontend Application](#working-with-the-frontend-application)
    - [Angular Basics](#angular-basics)
    - [Important Components and Routes](#important-components-and-routes)
    - [Interacting with the Backend API](#interacting-with-the-backend-api)

## Introduction

PAN Dashboard is a web application consisting of separate backend and frontend components. Its goal is to provide a simple and intuitive interface for managing products from Palo Alto Networks.

The backend is built using Django and PostgreSQL, while the frontend is developed with Angular. The backend provides a robust REST API, and the frontend consumes this API to offer a seamless user experience.

## Backend Overview

The backend is designed using Django and Django Rest Framework (DRF), featuring a modular architecture with well-structured applications. This setup lays a strong foundation for future development.

## Frontend Overview

The frontend is developed using Angular, providing a seamless user experience while interacting with the backend REST API.

## Project Dependencies

To work with this project, you'll need the following software installed on your system:

- Docker
- Docker Compose
- Python 3.9
- Node.js (for the frontend)

## Deployment Steps

To deploy both backend and frontend using Docker and Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your system.

2. Create an `.env` file in the backend directory and update it accordingly.

    ```bash
    cp backend/.env.example backend/.env
    vim .backend/.env
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

3. Build the Docker images and start the containers.

    ```bash
    docker-compose up --build
    ```

4. Wait for the web application to start (you can check the logs to ensure everything is running smoothly):

    ```bash
    docker-compose logs -f
    ```

5. Perform database migrations.

    ```bash
    docker-compose exec backend python manage.py makemigrations
    docker-compose exec backend python manage.py migrate
    ```

6. Create a superuser.

    ```bash
    docker-compose exec backend python manage.py createsuperuser
    ```

Your application should now be up and running! 🎉

## Technical Features

### Backend Features

- Django Rest Framework (DRF) for creating a RESTful API
- Django Allauth for user authentication and registration
- PostgreSQL as the database
- Docker and Docker Compose for easy and reproducible deployment
- API documentation using Redoc and Swagger

### Frontend Features

- Angular framework for building a dynamic and responsive UI
- Angular Material for a modern, sleek design
- Integration with the backend REST API
- Routing and route guards for secure navigation

## Working with the Backend Application

### Django Admin Panel

The Django admin panel is a powerful built-in tool for managing your application's data. With the admin panel, you can easily manage users, groups, and other models in your application. To access the admin panel:

1. Create a superuser (if you haven't already):

    ```bash
    docker-compose exec backend python manage.py createsuperuser
    ```

    Follow the prompts to create a superuser with a username, email, and password.

2. Access the admin panel by visiting `http://localhost:8000/admin` in your browser.

3. Log in with the superuser credentials you created earlier.

4. You can now manage users, groups, and other models through the admin panel. Click on the model you want to manage and add, edit, or delete entries as needed.

### Important API Endpoints

The backend application provides several important API endpoints that you can use to interact with the data. Some of the key endpoints are:

1. User Registration: `/api/v1/accounts/register/`

    ```yaml
    - Method: POST
    - Description: Register a new user with a username, email, and password.
    ```

2. User Login: `/api/v1/accounts/login/`

    ```yaml
    - Method: POST
    - Description: Log in an existing user with their username and password. Returns an authentication token.
    ```

3. User Logout: `/api/v1/accounts/logout/`

    ```yaml
    - Method: POST
    - Description: Log out the currently logged-in user.
    ```

4. User Details: `/api/v1/accounts/user/`

    ```yaml
    - Method: GET
    - Description: Retrieve the details of the currently logged-in user.
    ```

5. List Panoramas: `/api/v1/panoramas/`

    ```yaml
    - Method: GET
    - Description: Retrieve a list of all panoramas.
    ```

6. Create Panorama: `/api/v1/panoramas/`

    ```yaml
    - Method: POST
    - Description: Create a new panorama.
    ```

7. Retrieve, Update, or Delete a Panorama: `/api/v1/panoramas/:id/`

    ```yaml
    - Method: GET, PUT, DELETE
    - Description: Retrieve, update, or delete a specific panorama based on its ID.
    ```

Replace `:id` with the actual ID of the panorama you want to retrieve, update, or delete. These endpoints can be used with tools like Postman, Insomnia, or even with JavaScript fetch or Axios in the frontend to interact with the backend application.

## Working with the Frontend Application

### Angular Basics

The frontend of this project is built using Angular, a popular web application framework. To work with the frontend, you should be familiar with Angular's key concepts, such as components, services, and routing. You can learn more about Angular from the [official documentation](https://angular.io/docs).

### Important Components and Routes

The frontend application consists of several components that work together to provide a seamless user experience. Some of the key components and their associated routes are:

1. HomepageComponent (`/`)
   - Description: This component serves as the home page of the application. Users can navigate to different parts of the application from here.

2. LoginComponent (`/login`)
   - Description: This component handles user authentication, allowing users to log in with their username and password. Upon successful login, the user is redirected to the Homepage component.

3. InventoryComponent (`/inventory`)
   - Description: This component is the main entry point for the inventory features, but also provides the tables of subsequent inventory components. Will contain navigation options for the Panorama and Prisma components.

4. PanoramaComponent (`/inventory/panorama`)
   - Description: This component displays a list of panoramas and allows users to create new ones. It fetches data from the backend API and requires the user to be logged in. It also provides a detail view for each panorama entry, accessible via the URL pattern `/inventory/panorama/:id`, where `:id` is the ID of the panorama.

5. PrismaComponent (`/inventory/prisma`)
   - Description: This component is dedicated to Prisma-specific features, displaying a list of Prisma tenants and allowing users to create new ones. It fetches data from the backend API and requires the user to be logged in. It also provides a detail view for each Prisma tenant entry, accessible via the URL pattern `/inventory/prisma/:id`, where `:id` is the ID of the Prisma tenant.

6. PanoramaDetailComponent (`/inventory/panorama/:id`)
   - Description: This component displays the details of a specific panorama entry, with the ID provided in the URL. It fetches data from the backend API and requires the user to be logged in.

7. PrismaDetailComponent (`/inventory/prisma/:id`)
   - Description: This component displays the details of a specific Prisma tenant entry, with the ID provided in the URL. It fetches data from the backend API and requires the user to be logged in.

To navigate between these components, use the Angular Router. The router enables navigation from one component to the next as users perform tasks in the application. The RouterModule and Routes are imported in the `app.module.ts` file, and the routes are defined in the `app-routing.module.ts` file.

### Interacting with the Backend API

The frontend interacts with the backend API using Angular's HttpClient. The AuthService and other services are responsible for making API calls to the backend. These services are injected into components using Angular's dependency injection system.

For example, in the LoginComponent, the AuthService is used to log in a user by making a POST request to the `/api/v1/accounts/login/` endpoint. Upon successful login, the authentication token is stored in a cookie, and the user is redirected to the Homepage component.

To add more functionality or interact with additional API endpoints, create new services or modify existing ones. Then, inject those services into the components that require the new functionality.
