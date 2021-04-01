FROM python:3.8-slim-buster
WORKDIR /code/
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Install dependencies
RUN pip install pipenv
COPY ./backend/ /code/
RUN apt-get -y update && apt-get install -y --no-install-recommends gcc python3-dev libpq-dev
RUN pipenv install --system --dev
# Dowland wait script
RUN apt-get install -y --no-install-recommends wget
RUN wget -P /usr/local/bin/ https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it.sh
# Removing build time packages
RUN apt-get purge -y wget gcc python3-dev libpq-dev && apt-get -y autoremove
# Create folder for images
RUN mkdir /images_folder
# Create user fastapi_user nad give access to /code and /images_folder
RUN useradd fastapi_user && chown -R fastapi_user /code && chown -R fastapi_user /images_folder
