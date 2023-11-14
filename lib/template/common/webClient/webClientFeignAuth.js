const { toCapitalCase } = require('../../../utils/capitalCase')

const webClientFeignAuth = (summary, nameResource, nameWebclient) =>{
  const { packageName, typeProject } = summary;
  const nameCapital = toCapitalCase(nameWebclient);

  return `package ${packageName}.common.restClients;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@NoArgsConstructor
@AllArgsConstructor
@Component
public class ${nameCapital}RestClientAuth {

  private String token="";
  private String bearerToken="";
  private String username="";
  private String password="";

  public void setBearerToken(String token){
		this.bearerToken = token;
		this.username = "";
		this.password = "";
	}

  public void setBasicAuth(String username, String password){
		this.username = username;
		this.password = password;
	}

  public void setUsername(String username){
		this.username = username;
	}

  public void setPassword(String password){
		this.password = password;
	}

  public void setToken(String token){
    this.token = token;
  }

  public String getBearerToken(){
    return this.bearerToken;
  }

  public String getUsername(){
    return this.username;
  }

  public String getPassword(){
    return this.password;
  }

  public String getToken(){
    return this.token;
  }

}

  `;
};

module.exports = {
  webClientFeignAuth
}