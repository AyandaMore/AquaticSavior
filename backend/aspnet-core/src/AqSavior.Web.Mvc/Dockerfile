FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

RUN dotnet tool install -g Microsoft.Web.LibraryManager.Cli
RUN ln -s ~/.dotnet/tools/libman /usr/local/bin/libman

WORKDIR /src
COPY ["src/AqSavior.Web.Mvc/AqSavior.Web.Mvc.csproj", "src/AqSavior.Web.Mvc/"]
COPY ["src/AqSavior.Web.Core/AqSavior.Web.Core.csproj", "src/AqSavior.Web.Core/"]
COPY ["src/AqSavior.Application/AqSavior.Application.csproj", "src/AqSavior.Application/"]
COPY ["src/AqSavior.Core/AqSavior.Core.csproj", "src/AqSavior.Core/"]
COPY ["src/AqSavior.EntityFrameworkCore/AqSavior.EntityFrameworkCore.csproj", "src/AqSavior.EntityFrameworkCore/"]
WORKDIR "/src/src/AqSavior.Web.Mvc"
RUN dotnet restore 

WORKDIR /src
COPY ["src/AqSavior.Web.Mvc", "src/AqSavior.Web.Mvc"]
COPY ["src/AqSavior.Web.Core", "src/AqSavior.Web.Core"]
COPY ["src/AqSavior.Application", "src/AqSavior.Application"]
COPY ["src/AqSavior.Core", "src/AqSavior.Core"]
COPY ["src/AqSavior.EntityFrameworkCore", "src/AqSavior.EntityFrameworkCore"]
WORKDIR "/src/src/AqSavior.Web.Mvc"
RUN libman restore
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "AqSavior.Web.Mvc.dll"]
