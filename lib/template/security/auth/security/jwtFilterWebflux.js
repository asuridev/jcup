const {TYPES_PROJECTS} = require('../../../../utils/typesProject');

const jwtFilterWebflux = (summary) =>{

  const { packageName, typeProject } = summary;
  
  return `package ${packageName}.security;

  import lombok.RequiredArgsConstructor;
  import org.springframework.http.HttpHeaders;
  import org.springframework.lang.NonNull;
  import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
  import org.springframework.security.core.context.ReactiveSecurityContextHolder;
  import org.springframework.security.core.userdetails.*;
  import org.springframework.stereotype.Component;
  import org.springframework.web.server.ServerWebExchange;
  import org.springframework.web.server.WebFilter;
  import org.springframework.web.server.WebFilterChain;
  import reactor.core.publisher.Mono;
  
  
  @RequiredArgsConstructor
  @Component
  public class JwtFilter implements WebFilter {
      private final JwtUtil jwtUtil;
      private final ReactiveUserDetailsService reactiveUserDetailsService;
  
      @Override
      public Mono<Void> filter(@NonNull ServerWebExchange exchange, @NonNull WebFilterChain chain) {
          String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
          if(authHeader == null || !authHeader.startsWith("Bearer")){
              return chain.filter(exchange);
          }
          String jwt = authHeader.split(" ")[1].trim();
          if(!this.jwtUtil.isValid(jwt)){
              return chain.filter(exchange);
          }
          String username = this.jwtUtil.getUsername(jwt);
          return this.reactiveUserDetailsService.findByUsername(username)
                   .flatMap(u -> {
                              UsernamePasswordAuthenticationToken authentication = new  UsernamePasswordAuthenticationToken(
                                  u.getUsername(),
                                  u.getPassword(),
                                  u.getAuthorities()
                              );
                              return chain.filter(exchange)
                                      .contextWrite(ReactiveSecurityContextHolder.withAuthentication(authentication));
                   });
  
      }
  }
    
  `;
}


module.exports = {
  jwtFilterWebflux
}