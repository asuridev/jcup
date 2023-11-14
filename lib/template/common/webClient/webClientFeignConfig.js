const { toCapitalCase } = require('../../../utils/capitalCase')

const webClientFeignConfig = (summary, nameResource, nameWebclient) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(nameWebclient);

  return `package ${packageName}.common.restClients;


  import feign.Request;
  import feign.RequestInterceptor;
  import lombok.RequiredArgsConstructor;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  
  
  import java.util.Base64;
  import java.util.concurrent.TimeUnit;
  
  @RequiredArgsConstructor
  @Configuration
  public class ${nameCapital}RestClientConfig {
  
    private final ${nameCapital}RestClientAuth ${nameWebclient}RestClientAuth;
  
    @Bean
    Request.Options feignOptions() {
      return new Request.Options(5, TimeUnit.SECONDS,5, TimeUnit.SECONDS,false);
    }
  
  
    @Bean
    public RequestInterceptor requestInterceptor(){
      return requestTemplate -> {
        requestTemplate.header("Content-Type", "application/json");
        if(!${nameWebclient}RestClientAuth.getBearerToken().isEmpty()){
          requestTemplate.header("Authorization", "Bearer " + ${nameWebclient}RestClientAuth.getBearerToken());
          this.${nameWebclient}RestClientAuth.setBearerToken("");
        }
        if(!${nameWebclient}RestClientAuth.getUsername().isEmpty()){
          String userPass = this.${nameWebclient}RestClientAuth.getUsername() + ":" + this.${nameWebclient}RestClientAuth.getPassword();
          String userPassBase64 = Base64.getEncoder().encodeToString(userPass.getBytes());
          requestTemplate.header("Authorization", "Basic " + userPassBase64);
          this.${nameWebclient}RestClientAuth.setUsername("");
          this.${nameWebclient}RestClientAuth.setPassword("");
        }
      };
    }
  
  }
  
  `;
};

module.exports = {
  webClientFeignConfig
}