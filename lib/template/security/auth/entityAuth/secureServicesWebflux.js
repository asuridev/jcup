const { toCapitalCase } = require('../../../../utils/capitalCase');


const secureServicesWebflux = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services;

  import ${packageName}.common.exceptions.UnauthorizedException;
  import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
  import lombok.RequiredArgsConstructor;
  import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
  import org.springframework.security.core.userdetails.*;
  import org.springframework.stereotype.Component;
  import reactor.core.publisher.Mono;
  
  import java.util.List;
  import java.util.stream.Collectors;
  
  @Component
  @EnableWebFluxSecurity
  @RequiredArgsConstructor
  public class ${nameCapital}SecurityService implements  ReactiveUserDetailsService {
  
      private final ${nameCapital}ServiceRepository ${name}ServiceRepository;
  
      @Override
      public Mono<UserDetails> findByUsername(String username) {
        ${nameCapital}Dto user = ${name}ServiceRepository.findByUsername(username).orElse(null);
          if(user == null){
              return Mono.error(new UnauthorizedException());
          }
          String[] roles = new String [user.getRoles().size()];
          List<String> rolesAsString = user.getRoles().stream()
                  .map(role-> role.getRole()).collect(Collectors.toList());
          rolesAsString.toArray(roles);
          UserDetails userDetails = User.builder()
                  .username(user.getUsername())
                  .password(user.getPassword())
                  .accountLocked(user.getLocked())
                  .disabled(user.getDisabled())
                  .roles(roles)
                  .build();
  
          return Mono.just(userDetails);
      }
  }
    
  `;
};


module.exports = {
  secureServicesWebflux
}