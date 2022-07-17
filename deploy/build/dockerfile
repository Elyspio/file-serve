# Building back
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder-back
WORKDIR /app

COPY back/FileServe.sln ./FileServe.sln
COPY back/Core/FileServe.Api.Core.csproj ./Core/FileServe.Api.Core.csproj
COPY back/Abstractions/FileServe.Api.Abstractions.csproj ./Abstractions/FileServe.Api.Abstractions.csproj
COPY back/Db/FileServe.Api.Db.csproj ./Db/FileServe.Api.Db.csproj
COPY back/Adapters/FileServe.Api.Adapters.csproj ./Adapters/FileServe.Api.Adapters.csproj
COPY back/Web/FileServe.Api.Web.csproj ./Web/FileServe.Api.Web.csproj

RUN dotnet restore


COPY back .
RUN dotnet publish -c Release -o out  


# Building front
FROM --platform=linux/amd64 node:16 as builder-front

COPY front/package.json /front/package.json
COPY front/yarn.lock /front/
RUN cd /front && yarn install

COPY front/tsconfig.json /front/tsconfig.json
COPY front/public /front/public
COPY front/src /front/src
RUN cd /front && yarn run build


# Running
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /back
COPY --from=builder-back /app/out .

COPY --from=builder-front /front/build /back/wwwroot
ENV FRONT_PATH /back/wwwroot

RUN groupadd --gid 1000 -r netcoreserv && useradd -u 1000 --no-log-init -r -g netcoreserv netcoreserv
RUN chown -R netcoreserv /back
USER netcoreserv

EXPOSE 4003
ENTRYPOINT ["dotnet", "FileServe.Api.Web.dll"]

