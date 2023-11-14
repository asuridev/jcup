
const securityConfig = (summary)=>{

  const { packageName } = summary;

  return `package ${packageName}.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;



@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
        http    .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/**").permitAll()
                        .anyRequest().authenticated()
                ).httpBasic(AbstractHttpConfigurer::disable);

        return http.build();
    }
    
}

  `;
}

module.exports = {
  securityConfig
}