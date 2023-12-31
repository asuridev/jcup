
const azios = (summary) =>{
  
  const { packageName } = summary;

  return `package ${packageName}.common.azios;

import io.netty.channel.ChannelOption;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

public class Azios {

	String bearerToken = "";
	String username = "";
	String password = "";

	HttpClient httpClient = HttpClient.create()
			.responseTimeout(Duration.ofSeconds(60))
			.option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000);

	WebClient client;

	public Azios(String baseUrl) {
		this.client = WebClient.builder()
				.clientConnector(new ReactorClientHttpConnector(this.httpClient))
				.baseUrl(baseUrl)
				.filter(basicAuth())
				.filter(bearerAuth())
				.build();
	}

	public <T> Flux<T> getFlux(String url, Class<T> T) {
		return this.client.get()
				.uri(url)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToFlux(T);
	}

	public <T> Flux<T> getFlux( Class<T> T) {
		return this.client.get()
				.uri("")
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToFlux(T);
	}

	public <T> Mono<T> getMono(String url, Class<T> T) {
		return this.client.get()
				.uri(url)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> getMono( Class<T> T) {
		return this.client.get()
				.uri("")
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> post(String url, Object data, Class<T> T) {
		return this.client.post()
				.uri(url)
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> post( Object data, Class<T> T) {
		return this.client.post()
				.uri("")
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

	public <T, K> Mono<T> post(String url, Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.post()
				.uri(url)
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

	public <T, K> Mono<T> post(Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.post()
				.uri("")
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> patch(String url, Object data, Class<T> T) {
		return this.client.patch()
				.uri(url)
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> patch( Object data, Class<T> T) {
		return this.client.patch()
				.uri("")
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

	public <T, K> Mono<T> patch(String url, Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.patch()
				.uri(url)
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

		public <T, K> Mono<T> patch(Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.patch()
				.uri("")
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

	public <T> Mono<T> put(String url, Object data, Class<T> T) {
		return this.client.put()
				.uri(url)
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

		public <T> Mono<T> put( Object data, Class<T> T) {
		return this.client.put()
				.uri("")
				.header("Content-Type", "application/json")
				.bodyValue(data)
				.retrieve()
				.bodyToMono(T);
	}

	public <T, K> Mono<T> put(String url, Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.put()
				.uri(url)
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

	public <T, K> Mono<T> put( Mono<K> data, Class<K> K, Class<T> T) {
		return this.client.put()
				.uri("")
				.header("Content-Type", "application/json")
				.body(data, K)
				.retrieve()
				.bodyToMono(T);
	}

	public Mono<Void> delete(String url) {
		return this.client.delete()
				.uri(url)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToMono(Void.class);

	}

	public ExchangeFilterFunction basicAuth(){
		return (request, next) -> {
			String encodedCredentials = HttpHeaders.encodeBasicAuth(this.username,this.password,null);
			ClientRequest filtered = ClientRequest.from(request)
					.headers((headers) -> {
						if(!this.username.isEmpty()){
							headers.setBasicAuth(encodedCredentials);
							this.username = "";
							this.password = "";
						}
					})
					.build();
			return next.exchange(filtered);
		};
	}

	public ExchangeFilterFunction bearerAuth() {
		return (request, next) -> {
			ClientRequest filtered = ClientRequest.from(request)
					.headers((headers) -> {
						if(!this.bearerToken.isEmpty()){
							headers.setBearerAuth(this.bearerToken);
							this.bearerToken = "";
						}
					})
					.build();
			return next.exchange(filtered);
		};
	}

	public void setBearerToken( String token){
			this.bearerToken = token;
			this.username = "";
			this.password = "";
	}

	public void setBasicAuth( String username, String password){
			this.username = username;
			this.password = password;
	}

}
  `;
};

module.exports = {
  azios
}