const { toCapitalCase } = require('../utils/capitalCase')


const createApplicationTest = ({ packageName, projectName}) =>{

  const projectNameCapital = toCapitalCase(projectName);

  return `
  package ${packageName};

  import org.junit.jupiter.api.Test;
  import org.springframework.boot.test.context.SpringBootTest;

  @SpringBootTest
  class ${projectNameCapital}ApplicationTests {

	@Test
	void contextLoads() {
	}

}
  `;
}


module.exports = {
  createApplicationTest
}