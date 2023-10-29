
const securityConfigJava11 = (summary)=>{

  const { packageName } = summary;

  return `package ${packageName}.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;



@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
      http    
      .csrf().disable()
      .cors().and()
      .authorizeHttpRequests()
      .antMatchers("/**").permitAll()
      .anyRequest()
      .authenticated()
      .and()
      .httpBasic(Customizer.withDefaults());

      return http.build();
    }
    
}

  `;
}

module.exports = {
  securityConfigJava11
}