

const jwtUtil = (summary)=>{

  const { packageName, javaVersion, typeProject } = summary;

  return `package ${packageName}.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

    @Value("\${jwt.DURATION}")
    private String dutaration;

    @Value("\${jwt.SECRET_KEY}")
    private String secretKey;

    public String create(String username){
        return  JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(Integer.parseInt(this.dutaration))))
                .sign(Algorithm.HMAC256(this.secretKey));
    }

    public boolean isValid(String jwt){
        try {
            JWT.require(Algorithm.HMAC256(this.secretKey)).build().verify(jwt);
            return true;
        }catch(JWTVerificationException ex){
            return  false;
        }
    }

    public String getUsername(String jwt){
        return JWT.require(Algorithm.HMAC256(this.secretKey))
                .build().verify(jwt).getSubject();
    }

}
  `;
};

module.exports = {
  jwtUtil
}