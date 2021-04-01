FROM python:3.8-slim-buster AS build-stage
WORKDIR /code/

ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN python3 -m venv $VIRTUAL_ENV
RUN pip install pipenv
RUN apt-get -y update \
    && apt-get install -y --no-install-recommends wget gcc python3-dev libpq-dev \
    && wget -P /opt/venv/bin/ https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
COPY /backend/Pipfile* /code/
RUN pipenv install --dev


FROM python:3.8-slim-buster
WORKDIR /code/

COPY --from=build-stage /opt/venv /opt/venv
RUN chmod +x /opt/venv/bin/wait-for-it.sh
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN apt-get -y update \
    && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/*
COPY ./backend/ /code/
RUN mkdir /images_folder
# Create user fastapi_user nad give access to /code and /images_folder
RUN useradd fastapi_user \
    && chown -R fastapi_user /code \
    && chown -R fastapi_user /images_folder
