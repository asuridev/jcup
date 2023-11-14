

const dockerFile = (summary, projectName) =>{

  let dockerImage = "";
  const { javaVersion } = summary;
  if(javaVersion === 11){
    dockerImage = 'openjdk:11.0.10-jdk-slim';
  }else if(javaVersion === 17){
    dockerImage = 'openjdk:17-alpine3.14';
  }else {
    dockerImage = 'openjdk:19-alpine3.16'
  }

  return `FROM ${dockerImage} as builder
WORKDIR /app
COPY . .
RUN ./gradlew  build -x test


FROM ${dockerImage}
WORKDIR /app
COPY --from=builder /app/build/libs/${projectName}-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "./${projectName}-0.0.1-SNAPSHOT.jar"]
`;

};

module.exports = {
  dockerFile
}