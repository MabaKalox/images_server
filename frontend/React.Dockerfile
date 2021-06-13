FROM node:alpine AS build-stage
WORKDIR /app
COPY /frontend/package*.json /app/
COPY /frontend/ /app/
RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && yarn install \
    && apk del .gyp
RUN yarn build

FROM nginx:alpine
COPY --from=build-stage /app/build/ /var/www/html/public/
COPY /nginx/conf.d/ /etc/nginx/conf.d/
RUN apk add openssl
RUN openssl req -x509 -nodes -days 365 -subj "/C=LV/ST=RIGA/O=maba_kalox_co, Inc./CN=maba_kalox.io" -addext "subjectAltName=DNS:maba_kalox.io" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
