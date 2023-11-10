const { toCapitalCase } = require('../utils/capitalCase')
const { TYPES_PROJECTS } = require('../utils/typesProject');

const createApplication = (summary) =>{
  const { packageName, projectName, typeProject} = summary;
  const projectNameCapital = toCapitalCase(projectName);
  const decoradoFeign = typeProject === TYPES_PROJECTS.SERVLET 
    ? '@EnableFeignClients':'';
  const importFeign = typeProject === TYPES_PROJECTS.SERVLET 
    ? 'import org.springframework.cloud.openfeign.EnableFeignClients;':'';

    
  return `package ${packageName};

  ${importFeign}
  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
  import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

  ${decoradoFeign}
  @EnableJpaAuditing
  @EnableJpaRepositories
  @SpringBootApplication
  public class ${projectNameCapital}Application {

	public static void main(String[] args) {
		SpringApplication.run(${projectNameCapital}Application.class, args);
	}

}
  `;
}


module.exports = {
  createApplication
}