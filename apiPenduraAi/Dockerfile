FROM maven:latest AS build

COPY src app/src
COPY pom.xml /app

WORKDIR /app

RUN mvn clean install -DskipTests

FROM eclipse-temurin:19-jre-alpine

COPY --from=build /app/target/apiPenduraAi-0.0.1-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]