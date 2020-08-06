FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 150577
ENV MYSQL_DATABASE lapcitydb
ENV MYSQL_USER sowfkun
ENV MYSQL_PASSWORD 150577
ENV DATABASE_HOST=db

COPY ./my.cnf /etc/mysql/my.cnf
COPY /db_script/*.sql /docker-entrypoint-initdb.d/

RUN chmod 777 /docker-entrypoint-initdb.d/*.sql

EXPOSE 3306 33060
