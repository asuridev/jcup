
const azios = (summary) =>{
  
  const { packageName } = summary;

  return `package ${packageName}.common.azios;

import io.netty.channel.ChannelOption;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

public class Azios {

	String bearerToken = "";
	String user = "";
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

	public <T> Flux<T> get(String url, Class<T> T) {
		return this.client.get()
				.uri(url)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToFlux(T);
	}

	public <T> Flux<T> get( Class<T> T) {
		return this.client.get()
				.uri("")
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.bodyToFlux(T);
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
		 return ExchangeFilterFunctions.basicAuthentication(this.user, this.password);
	}

	public ExchangeFilterFunction bearerAuth() {
		return (request, next) -> {
			ClientRequest filtered = ClientRequest.from(request)
					.headers((headers) -> {
							headers.setBearerAuth(this.bearerToken);
					})
					.build();
			return next.exchange(filtered);
		};
	}

	public void setBearerToken( String token){
			this.bearerToken = token;
			this.user = "";
			this.password = "";
	}

	public void setBasicAuth( String user, String password){
			this.user = user;
			this.password =password;
	}

}
  `;
};

module.exports = {
  azios
}