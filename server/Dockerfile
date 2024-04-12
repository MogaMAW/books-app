
FROM openjdk:17-jdk-slim
COPY /target/books-backend-0.0.1-SNAPSHOT.jar books-backend.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","books-backend.jar"]
