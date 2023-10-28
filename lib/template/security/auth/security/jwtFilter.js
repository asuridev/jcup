const {TYPES_PROJECTS} = require('../../../../utils/typesProject');

const jwtFilter = (summary) =>{

  const { packageName, javaVersion, typeProject } = summary;
  const currentPackage = javaVersion === 11 ? 'javax': 'jakarta';

  return `package ${packageName}.security;

import ${currentPackage}.servlet.FilterChain;
import ${currentPackage}.servlet.ServletException;
import ${currentPackage}.servlet.http.HttpServletRequest;
import ${currentPackage}.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request,response);
            return;
        }

        String jwt = authHeader.split(" ")[1].trim();

        if(!this.jwtUtil.isValid(jwt)){
            filterChain.doFilter(request,response);
            return;
        }
        String username = this.jwtUtil.getUsername(jwt);
        User user = (User) this.userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                user.getUsername(),user.getPassword(),user.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request,response);
    }

}
  `;
}


module.exports = {
  jwtFilter
}