
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app/server
 
COPY server/pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy the application source code
COPY server/src ./src

# Build the application
RUN mvn package 

FROM openjdk:17-jdk-slim

WORKDIR /app/server

# Copy the JAR file built in the previous stage
COPY --from=build /app/server/target/books-backend-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

CMD ["java", "-jar", "books-backend-0.0.1-SNAPSHOT.jar"]

