const {toCapitalCase} = require('../../../../utils/capitalCase');
const {getTypeData} = require('../../../../utils/getTypeData');
const {TYPES_PROJECTS} = require('../../../../utils/typesProject');


const serviceAuth  = (summary, name) => {

  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(name);
  const { strategyId } = summary[name];
  const typeData = getTypeData(strategyId);

  if(typeProject === TYPES_PROJECTS.WEBFLUX){

    return `package ${packageName}.${name}.services;

import ${packageName}.common.exceptions.NotFoundException;
import ${packageName}.${name}.services.dtos.Create${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.Update${nameCapital}Dto;
import ${packageName}.${name}.services.dtos.${nameCapital}Dto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


@RequiredArgsConstructor
@Service
public class ${nameCapital}Service {

    private final ${nameCapital}ServiceRepository ${name}ServiceRepository;

    public Mono<${nameCapital}Dto> create(Create${nameCapital}Dto create${nameCapital}Dto){
        return Mono.just(${name}ServiceRepository.create${nameCapital}(create${nameCapital}Dto));
    }

    public Mono<Page<${nameCapital}Dto>> findAll(int page, int limit, String sortBy){
        return Mono.just(${name}ServiceRepository.findAll${nameCapital}s(page, limit ,sortBy));
    }

    public Mono<${nameCapital}Dto> findOne(${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id);
        if(${name} == null) return Mono.error(new NotFoundException());
        return Mono.just(${name});
    }

    public Mono<${nameCapital}Dto>  update(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id){
        ${nameCapital}Dto ${name} =  ${name}ServiceRepository.update${nameCapital}(update${nameCapital}Dto, id);
        if(${name} == null) return Mono.error(new NotFoundException());
        return Mono.just(${name});
    }

    public Mono<Void> remove(${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id);
        if(${name} == null) return Mono.error(new NotFoundException());
        ${name}ServiceRepository.remove${nameCapital}(id);
        return Mono.empty();
    }
}

    `;
  }
  // caso Servlet
  return `package ${packageName}.${name}.services;

import ${packageName}.common.exceptions.NotFoundException;
import ${packageName}.${name}.services.dtos.*;
import ${packageName}.common.exceptions.BadRequestException;
import ${packageName}.common.exceptions.NotFoundException;
import ${packageName}.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;


@RequiredArgsConstructor
@Service
public class ${nameCapital}Service {

    private final ${nameCapital}ServiceRepository ${name}ServiceRepository;
    private final Converter${nameCapital}Dto converter${nameCapital}Dto;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public ResponseLoginDto login(String header){
        if(header == null || !header.startsWith("Basic")) throw new BadRequestException();
        String credentialBase64 = header.split(" ")[1];
        String stringCredential = new String(Base64.getDecoder().decode(credentialBase64));
        String[] credentials = stringCredential.split(":");
        UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(credentials[0],credentials[1]);
        Authentication authentication = this.authenticationManager.authenticate(login);
        return ResponseLoginDto.builder()
                .token(jwtUtil.create(credentials[0]))
                .build();
    }

    public Response${nameCapital}Dto create(Create${nameCapital}Dto create${nameCapital}Dto){
        create${nameCapital}Dto.setPassword(passwordEncoder.encode(create${nameCapital}Dto.getPassword()));
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.create${nameCapital}(create${nameCapital}Dto);
        return this.converter${nameCapital}Dto.toResponse${nameCapital}Dto(${name});
    }

    public Page<Response${nameCapital}Dto> findAll(int page, int limit, String sortBy){
        Page<${nameCapital}Dto> ${name}s = ${name}ServiceRepository.findAll${nameCapital}s(page, limit ,sortBy);
        return  ${name}s.map(converter${nameCapital}Dto::toResponse${nameCapital}Dto);
    }

    public Response${nameCapital}Dto findOne(${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.findOne${nameCapital}(id).orElseThrow(NotFoundException::new);
        return this.converter${nameCapital}Dto.toResponse${nameCapital}Dto(${name});
    }

    public Response${nameCapital}Dto update(Update${nameCapital}Dto update${nameCapital}Dto, ${typeData} id){
        ${nameCapital}Dto ${name} = ${name}ServiceRepository.update${nameCapital}(update${nameCapital}Dto, id).orElseThrow(NotFoundException::new);
        return this.converter${nameCapital}Dto.toResponse${nameCapital}Dto(${name});
    }

    public void remove(${typeData} id){
        this.findOne(id);
        ${name}ServiceRepository.remove${nameCapital}(id);
    }
}

  `;
}

module.exports = {
    serviceAuth
}