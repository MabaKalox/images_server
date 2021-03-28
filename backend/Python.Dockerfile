FROM python:3.8
WORKDIR /code/
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Install dependencies
RUN pip install pipenv
COPY . /code/
RUN pipenv install --system --dev
# Dowland wait script
RUN wget -P /usr/local/bin/ https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it.sh
# Create folder for images
RUN mkdir /images_folder
# Create user fastapi_user nad give access to /code and /images_folder
RUN useradd fastapi_user && chown -R fastapi_user /code && chown -R fastapi_user /images_folder
