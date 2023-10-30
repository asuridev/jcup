
const securityConfigWebflux = (summary)=>{

  const { packageName } = summary;

  return `package ${packageName}.security;


  import lombok.RequiredArgsConstructor;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.security.config.Customizer;
  import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
  import org.springframework.security.config.web.server.ServerHttpSecurity;
  import org.springframework.security.web.server.SecurityWebFilterChain;
  
  
  
  @RequiredArgsConstructor
  @EnableWebFluxSecurity
  @Configuration
  public class SecurityConfig {
      
      @Bean
      public SecurityWebFilterChain filterChain (ServerHttpSecurity http) {
          http    .csrf(ServerHttpSecurity.CsrfSpec::disable)
                  .cors(Customizer.withDefaults())
                  .authorizeExchange(exchanges -> exchanges
                          .pathMatchers("/**").permitAll()
                          .anyExchange().authenticated()
                  )
                  .httpBasic(Customizer.withDefaults());
  
          return http.build();
      }
      
  }
  
  `;
}

module.exports = {
  securityConfigWebflux
}