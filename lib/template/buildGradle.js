const settings = require('../settings/setting.json');

const createBildGradle = ({ groupName, javaVersion, dependencies })=>{
	const plugins = settings.plugins[javaVersion]
	const pluginsGradle = plugins.map(plugin => `id '${plugin.group}' version '${plugin.version}'`).join('\n\t\t');

	const dependenciesGradle = dependencies.map(dependencie => {
		return settings.dependencies[dependencie].map(name => {
				return `${name.configuration} '${name.group}:${name.name}${name.version&&`:${name.version}`}'`
			}).join('\n\t\t');
	}).join('\n\t\t');

	return `	plugins {
		id 'java'
		${pluginsGradle}
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
		${dependenciesGradle}
	}

	dependencyManagement {
		imports {
			mavenBom "org.springframework.cloud:spring-cloud-dependencies:2022.0.4"
		}
	}
	
	tasks.named('test') {
		useJUnitPlatform()
	}
	
	`;
}

module.exports = {
	createBildGradle
}

