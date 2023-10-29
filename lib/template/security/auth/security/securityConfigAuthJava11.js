

const securityConfigAuthJava11 = (summary, name)=>{

  const { packageName, javaVersion, typeProject } = summary;


  return `package ${packageName}.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
        http
          .csrf().disable()
          .cors().and()
          .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
          .authorizeHttpRequests()
          .antMatchers("/${name}/auth/login").permitAll()
          .antMatchers("/${name}","/${name}/*").permitAll()
          .antMatchers("/role","/role/*").permitAll()
          .anyRequest()
          .authenticated()
          .and()
          .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}

  `;
};


module.exports = {
  securityConfigAuthJava11
}