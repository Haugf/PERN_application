FROM postgres:9.6

# This image will setup postgres automatically using provided env variables.
# https://hub.docker.com/_/postgres
# Env variables provided by kubernetes/helm take precedence. As such, .envs/.postgres values
# can be used for local development w/ docker-compose.

COPY ./docker_compose/postgres/init.sql /docker-entrypoint-initdb.d/

