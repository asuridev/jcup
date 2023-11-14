
const corsConfigWebflux = (summary)=>{

  const { packageName } = summary;

  return `package ${packageName}.security;

  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.cors.CorsConfiguration;
  import org.springframework.web.cors.reactive.CorsWebFilter;
  import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
  
  import java.util.Arrays;
  
  @Configuration
  public class CorsConfig {
  
      @Bean
      CorsWebFilter corsFilter() {
          CorsConfiguration configuration = new CorsConfiguration();
          configuration.setAllowedOrigins(Arrays.asList("http://example.com"));
          configuration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PUT","PATCH"));
          configuration.setAllowedHeaders(Arrays.asList("*"));
          UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
          source.registerCorsConfiguration("/**", configuration);
          return new CorsWebFilter(source);
      }
  
  }
    

  `;
}

module.exports = {
  corsConfigWebflux
}