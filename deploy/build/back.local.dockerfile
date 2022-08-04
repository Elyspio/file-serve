# Building back
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder
WORKDIR /app

COPY back/FileServe.sln ./
COPY back/Core/FileServe.Api.Core.csproj ./Core/
COPY back/Abstractions/FileServe.Api.Abstractions.csproj ./Abstractions/
COPY back/Db/FileServe.Api.Db.csproj ./Db/
COPY back/Adapters/FileServe.Api.Adapters.csproj ./Adapters/
COPY back/Web/FileServe.Api.Web.csproj ./Web/

RUN dotnet restore --packages /app/packages


# Running
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS back
WORKDIR /app
COPY --from=builder /app/packages/ /app/

ENTRYPOINT ["dotnet", "watch", "--project", "Web"]

