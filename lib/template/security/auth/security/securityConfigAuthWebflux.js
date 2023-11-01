

const securityConfigAuthWebflux = (summary, name)=>{

  const { packageName, javaVersion, typeProject } = summary;


  return `package ${packageName}.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;


@RequiredArgsConstructor
@EnableWebFluxSecurity
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final  ReactiveUserDetailsService reactiveUserDetailsService;

    @Bean
    public SecurityWebFilterChain filterChain (ServerHttpSecurity http) {
        http.csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(Customizer.withDefaults())
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance())
                .authorizeExchange(exchanges -> exchanges
                        .pathMatchers("/${name}/auth/login").permitAll()
                        .pathMatchers("/${name}","/${name}/*").permitAll()
                        .pathMatchers("/role","/role/*").permitAll()
                        .anyExchange().authenticated()
                )
                .addFilterAt(jwtFilter, SecurityWebFiltersOrder.AUTHENTICATION);
  
        return http.build();
    }

    @Bean
    public UserDetailsRepositoryReactiveAuthenticationManager reactiveAuthenticationManager(){
      return new UserDetailsRepositoryReactiveAuthenticationManager(reactiveUserDetailsService);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

      
}
  
  `;
};


module.exports = {
  securityConfigAuthWebflux
}