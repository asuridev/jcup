const { TYPES_PROJECTS } =  require('../../../utils/typesProject');

const swaggerConfig = (summary)=>{

  const { packageName, typeProject } = summary;

  //caso webflux
  if(typeProject === TYPES_PROJECTS.WEBFLUX){
    
    return `package ${packageName}.common.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SwaggerConfig {


    @Bean
    public OpenAPI customOpenApi(){
        return  new OpenAPI()
                .info(new Info()
                        .title("JCUP Documentation")
                        .version("0.11")
                        .description("simple App SpringBoot with swagger")
                        .termsOfService("http//swagger.io/terms/")
                );
    }
}
    `;
  }


  //caso servlet
  return `package ${packageName}.common.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.FixedLocaleResolver;

import java.util.Locale;

@Configuration
public class SwaggerConfig {

    @Bean
    LocaleResolver localeResolver() {
        // Force english for  error messages
        return new FixedLocaleResolver(Locale.ENGLISH);
    }

    @Bean
    public OpenAPI customOpenApi(){
        return  new OpenAPI()
                .info(new Info()
                        .title("JCUP Documentation")
                        .version("0.11")
                        .description("simple App SpringBoot with swagger")
                        .termsOfService("http//swagger.io/terms/")
                );
    }
}

  `;
};

module.exports = {
  swaggerConfig
}