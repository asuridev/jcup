const { toCapitalCase } = require('../utils/capitalCase')


const createApplication = ({ packageName, projectName}) =>{

  const projectNameCapital = toCapitalCase(projectName);

  return `package ${packageName};

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
  import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

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