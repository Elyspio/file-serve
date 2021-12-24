FROM golang as init

RUN mkdir -p /wip
WORKDIR /wip

ADD generate-cert.sh ./generate-cert.sh

RUN chmod +x generate-cert.sh
RUN bash ./generate-cert.sh "mongo1.local,mongo2.local" ./

FROM alpine as prod

COPY --from=init /wip/certs/mongo 












