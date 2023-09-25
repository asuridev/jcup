const { toCapitalCase } = require('../utils/capitalCase')


const createApplicationTest = ({ packageName, proyectName}) =>{

  const proyectNameCapital = toCapitalCase(proyectName);

  return `
  package ${packageName};

  import org.junit.jupiter.api.Test;
  import org.springframework.boot.test.context.SpringBootTest;

  @SpringBootTest
  class ${proyectNameCapital}ApplicationTests {

	@Test
	void contextLoads() {
	}

}
  `;
}


module.exports = {
  createApplicationTest
}