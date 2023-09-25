const createBildGradle = ({ groupName, javaVersion, dependencies })=>{

	return `
	plugins {
		id 'java'
		id 'org.springframework.boot' version '3.1.4'
		id 'io.spring.dependency-management' version '1.1.3'
	}
	
	group = '${groupName}'
	version = '0.0.1-SNAPSHOT'
	
	java {
		sourceCompatibility = '${javaVersion}'
	}
	
	configurations {
		compileOnly {
			extendsFrom annotationProcessor
		}
	}
	
	repositories {
		mavenCentral()
	}
	
	dependencies {
		implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
		implementation 'org.springframework.boot:spring-boot-starter-web'
		compileOnly 'org.projectlombok:lombok'
		annotationProcessor 'org.projectlombok:lombok'
		testImplementation 'org.springframework.boot:spring-boot-starter-test'
	}
	
	tasks.named('test') {
		useJUnitPlatform()
	}
	
	`;
}

module.exports = {
	createBildGradle
}
