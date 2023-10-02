const { toCapitalCase } = require('../utils/capitalCase')


const createApplication = ({ packageName, proyectName}) =>{

  const proyectNameCapital = toCapitalCase(proyectName);

  return `package ${packageName};

  import org.springframework.boot.SpringApplication;
  import org.springframework.boot.autoconfigure.SpringBootApplication;
  import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
  import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

  @EnableJpaAuditing
  @EnableJpaRepositories
  @SpringBootApplication
  public class ${proyectNameCapital}Application {

	public static void main(String[] args) {
		SpringApplication.run(${proyectNameCapital}Application.class, args);
	}

}
  `;
}


module.exports = {
  createApplication
}