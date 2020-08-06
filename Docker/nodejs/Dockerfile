
FROM node:latest

RUN mkdir /home/myweb
VOLUME /home/sowfkun/lapcity/webproject /home/myweb

ADD init.sh /init.sh
RUN chmod 777 /init.sh

EXPOSE 80 8080
CMD ["/init.sh"]

