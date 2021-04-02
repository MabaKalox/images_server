ARG VIRTUAL_ENV_ARG=/opt/venv

FROM python:3.8-slim-buster AS build-stage
WORKDIR /code/
ARG VIRTUAL_ENV_ARG

ENV VIRTUAL_ENV=${VIRTUAL_ENV_ARG}
ENV PATH="${VIRTUAL_ENV_ARG}/bin:$PATH"
COPY /backend/Pipfile* ./
RUN apt-get -y update \
    && apt-get install -y --no-install-recommends \
        wget \
        gcc \
        python3-dev \
        libpq-dev \
    && wget -P ${VIRTUAL_ENV_ARG}/bin/ https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x ${VIRTUAL_ENV_ARG}/bin/wait-for-it.sh \
    && python3 -m venv $VIRTUAL_ENV \
    && pip install pipenv \
    && pipenv install --dev


FROM python:3.8-slim-buster
WORKDIR /code/
ARG VIRTUAL_ENV_ARG

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV VIRTUAL_ENV=${VIRTUAL_ENV_ARG}
ENV PATH="${VIRTUAL_ENV_ARG}/bin:$PATH"

COPY --from=build-stage ${VIRTUAL_ENV_ARG} ${VIRTUAL_ENV_ARG}
COPY ./backend/ ./

RUN apt-get -y update \
    && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/* \
# Create user fastapi_user nad give access to /code and /images_folder
RUN useradd fastapi_user \
    && chown -R fastapi_user /code \
    && mkdir /images_folder \
    && chown -R fastapi_user /images_folder
