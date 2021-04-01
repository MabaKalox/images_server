# Project Title

This is Image Server for storing and managing images

## Getting Started

git clone git@github.com:MabaKalox/images_server.git

### Prerequisites

docker
https://docs.docker.com/get-docker/

docker-compose (by default installed with docker on non linux hosts, but better check)
https://docs.docker.com/compose/install/

allow not root user use docker
https://docs.docker.com/engine/install/linux-postinstall/

### Installing

Build docker images

```
cd ./images_server
docker-compose build
```

## Running Dev

```
cd ./images_server
docker-compose up
```

access server on: https://0.0.0.0,
access database on localhost:5432

## Running Product

```
cd ./images_server
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

access server on: https://0.0.0.0

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
