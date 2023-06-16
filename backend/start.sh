#!/bin/bash

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Load scripts
echo "Load scripts"
python manage.py load_scripts /code/saute/scripts

# Start server
echo "Starting server"
exec python manage.py runserver 0.0.0.0:8000
