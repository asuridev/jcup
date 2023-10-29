const { toCapitalCase } = require('../../../../utils/capitalCase');


const secureServices = (summary, name)=>{

  const { packageName } = summary;
  const nameCapital = toCapitalCase(name);

  return `package ${packageName}.${name}.services;

import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserSecurityService implements UserDetailsService {

    private final ${nameCapital}ServiceRepository ${name}ServiceRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = ${name}ServiceRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Not Found"));

        String[] roles = new String [${name}.getRoles().size()];
        List<String> rolesAsString = ${name}.getRoles().stream()
                .map(role-> role.getRole()).collect(Collectors.toList());
        rolesAsString.toArray(roles);

        return User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .accountLocked(user.getLocked())
                .disabled(user.getDisabled())
                .roles(roles)
                .build();

    }
}

  `;
};


module.exports = {
  secureServices
}