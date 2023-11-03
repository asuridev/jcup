<p align="center">
  <a href="https://www.npmjs.com/package/jcup" target="blank"><img src="./assets/logo.png" width="220" alt="Nest Logo" /></a>
</p>

<p align="center">Una CLI creada con <a href="https://nodejs.org" target="_blank">Node.js</a> para facilitar la construcción de proyectos de Spring Boot.</p>
<p align="center">

## Descripción
JCUP es una aplicación de línea de comando creada en JavaScript que permite automatizar la construcción de aplicaciones de Java implementando el framework Spring Boot.

JCUP  permite:
- Crear un proyecto (Gestionado por gradle).
- Instalar dependencias.
- Desinstalar dependencias.
- Generar recursos.
- Crear Dtos.
- Gestionar conexiones a bases de datos.
- Generar clientes Web. 
- Implementar seguridad.
- Generar documentación.

Todo esto, implementando una arquitectura por capas orientada al dominio.

## Instalación
Para la instalación se requiere Node.js Version 14 o superiores.
```
  npm i -g jcup
```
## Creando un proyecto mediante JCUP.
```
  jcup new name-proyect
```
Seguido de esto, el asistente le mostrará una serie de menús donde podrá definir las características que usará en su proyecto, así como las tecnologías a implementar.

### Tipo de proyecto.
Podemos optar por construir un proyecto REST Servlet totalmemte síncrono o implementar el paradigma de programacion reactiva utilizando webflux.
JCUP ajustará las dependencias y archivos en función del tipo seleccionado.

!["menu1"](/assets/menu-1.png)

### Version de Java.
JCUP también le solicitará información acerca de la version de Java a usar en el desarrollo del proyecto. Según esto, JCUP seleccionará la version de Spring Boot y hará las configuraciones adecuadas para el proyecto.

!["menu1"](/assets/menu-2.png)

### Motor de base de datos.
Podrá seleccionar una entre varias  opciones de motores de bases de datos. JCUP gestionará los drivers y conexiones según las bases de datos seleccionadas.

!["menu1"](/assets/menu-3.png)

### Integrar Docker Compose.
Si la version de Java seleccionada es Java 17 o superior tendrá la opcion de integrar Docker Compose al proyecto. Si es afirmativo, JCUP generará un archivo llamado "compose.yaml" y hará la instalación de las dependencias para crear y conectarse a una base de datos de Docker de forma automática.
Esto es bastante útil en la fase de desarrollo y poder abstraer todo el proceso de creación y conexión a una capa de persistencia. 
!["menu1"](/assets/menu-4.png)

A continuación, el resumen de la creación de un proyecto.

!["menu1"](/assets/menu-5.png)

### Estructura de paquetes.
JCUP generará el proyecto con dos paquetes bases. Un paquete **common** donde estarán las clases con funcionalidad común para los diferentes recursos que puedan existir en el proyecto, tales como manejo de excepciones y validadores.
Y el segundo paquete llamado **security** donde podremos aplicar la configuración a nivel de CORS de nuestro servidor. 
En la carpeta de resources se construirán tres archivos para manejar las propiedades de entorno de Spring Boot, para desarrollo y producción respectivamente.

!["menu1"](/assets/menu-6.png)

## Generando un recurso.

```
  jcup generate resource name-resource
```
tambien podemos utilizar el shorthand:
```
  jcup g res name-resource
```
Se mostrará un asistente que le permitará seleccionar el tipo de estrategia de generación de claves primarias de la base de datos y si aplicará una auditoria a este recurso. Si selecciona que el recurso será auditable, JCUP implementará la configuración necesaria para agregar los campos de fecha de creación y fecha de actualización al recurso de forma automática.

  !["menu1"](/assets/menu-7.png)

  !["menu1"](/assets/menu-8.png)

Cuando generamos un recurso se creará un CRUD completo implementando una arquitectura de tres capas: controller, persitence y services. Puede observar en la imagen la inversion de dependencia entre la capa de persistencia y la  capa de servicio comparada con el modelo de capas tradicional, lo cual permite aislar la capa de servicio de cualquier detalle de implementación en la persitencia de datos.

!["menu1"](/assets/capas.svg)

**Nota**: Las flechas de la imagen representan las dependencias entre las capas, no el flujo de los datos.

Para un recurso llamado Product se mostrará la siguiente estructura.

!["menu1"](/assets/menu-10.png)

### Capa controladora.
Esta contiene una clase con las anotaciones y los métodos necesarios para recibir las solictudes que provienen del cliente. Ademas tendrá el potencial para realizar validaciones a nivel de parámetros, si el caso de uso lo requiere.
Cuando el recurso es credo JCUP expone por defecto los endpoints en **api/v1/name-resource** en el puerto **3000**. si desea cambiar este comportaminto modifique el archivo aplication.yml.
De forma predeterminada y automática JCUP genera cinco endpoints para dicho recurso segun la tabla.

| Metodo   | Endpoint | Descripcion |
|----------|----------|:------------:|
| GET      | api/v1/resource?page=1&limit=10&orderBy=name |Obtenemos todos los recursos de forma paginada, los query params son opcionales |
| GET      | api/v1/resource/{id} |Obtenemos un recurso segun el id|
| POST     | api/v1/resource    |creamos un recurso segun los parametros pasados en el body de la solicitud|
| PATCH    | api/v1/resource/{id} |Actualizamos un recurso segun el id y las propiedades pasada en el cuerpo de la solicitud|
| DELETE   | api/v1/resource/{id} |eliminamos un registro de la base de datos segun el id|

### Capa de persistencia.

Esta capa posee dentro del paquete entities las definiciones de las entidades que este recurso almacenará en la base de datos, Los mappers para traducir los objetos tipo entidad a los objetos de tipo servicio (Dto). Además posee la implementación del repositorio, que fue definida en la capa de servicio.

### Capa de servicio.

Ésta posee la clase service que contiene los métodos que resuelven el caso de uso del recurso. Contiene toda la lógica que debe implementar el agregado. Tambien posee dentro del paquete dtos los objetos de datos necesarios para la comunicación entre capas. Además un convertidor de dtos cuya finalidad es convertir al dto de respuesta que espera el controlador.
de forma automática JCUP genera 5 métodos a nivel de servicio que resuelven las solicitudes para cada endpoint definido en la capa controladora.

## Flujo de datos.

JCUP usa el <a href="https://en.wikipedia.org/wiki/Data_mapper_pattern" target="_blank">patron data mapper</a> con el objetivo de no generar dependencias en la capa de servicio a cualquier implementación en la capa de persistencia.
Para implementar este patrón de forma eficiente, JCUP utiliza las librerias <a href="https://projectlombok.org/" target="_blank">Lombok</a> y <a target="_blank" href="https://mapstruct.org/">MapStruct</a>.

Aunque el proceso pareciera complejo, JCUP realiza todas las definiciones de los mappers para cada recurso generado, mientras que MapStruct se encarga de las implementaciones, dejando al desarrollador la tarea  de definir los  nombres de las propiedades y relaciones entre las entidades.

!["menu1"](/assets/flujo.svg)

## Generando un Cliente Web

```
  jcup generate web-client name-web-client
```
tambien podemos utilizar el shorthand:
```
  jcup g wc name-web-client
```
Los clientes Web generados se ubican en el paquete webClients dentro del paquete common. Para  configurarlo se debe pasar al constructor la URL base a la cual desea  enviar las solicitudes, opcionalmente puede establecer las credenciales de seguridad si es el caso.
Todos los clientes Web generados por JCUP se extienden de la clase Azios presente en el paquete common que se creó a la hora de contruir el proyecto. La clase Azios cuenta con las implementaciones de los métodos típicos del protocolo HTTP, cada uno de ellos construidos con una instancia de **WebClient** de web-flux.

Hay que ser cuidadoso de no inyectar  instancias de webClients en la capa de servicio, debido a que generariamos dependencias al protocolo comunicación HTTP en esta capa. La Arquitectura Exagonal plantea definir puertos y adatadores que garantizen que la capa de servicio no dependa de ningun detalle de emplementacion, en este caso de la capa de infraestructura.

!["menu1"](/assets/port-adapter.svg)

Los puertos deben ser agnosticos al protocolo de comunicion, seran interfaces que definen los datos que se requiren de un servicio externo. Los adaptadores  implementaran estas interfaces y se valdran de algún protocolo de comunicacion para transferir los datos a los servicios que se desean consumir.

JCUP utiliza el patrón <a target="_blank" href="https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)">port adapter</a>  para aislar la capa de servicio de algún protocolo de comunicación en particular.

## Creando Puertos y Adaptadores

```
  jcup generate port-adapter name-resource/name-port
```
tambien podemos utilizar el shorthand:
```
  jcup g pa name-resource/name-port
```

Para implementar este patron JCUP generará un cliente web  con el nombre dado en el comando, con la terminacion **WebClient**, creará un puerto (interfaz) con la terminacion **Port** en el paquete de servicio del recurso definido y una clase con la terminacion **Adapter** dentro del paquete  de comunication.
El desarrollador podrá inyectar el puerto en el servicio del recuso sin generar dependencias. y  realizar las implementaciones de los metodos en la clase adapter donde JCUP inyectó el cliente web generado de forma automática.

## Generando Dtos

```
  jcup generate dto name-resource/name-dto
```
tambien podemos utilizar el shorthand:
```
  jcup g dto name-resource/name-dto
```
JCUP creará  un archivo con la terminación Dto con las anotaciones necesarias para que el desarrollador solo defina las propiedades que requiere para este nuevo objeto de transferencia.

Una herramienta adicional que JCUP ofrece para construir dtos, es generarlos a partir de un archivo JSON, el cual pude ser la respuesta que proviene de un servicio externo.  Debe asegurarse de tener esta respuesta copiada al clipboard, y ejecutar el comando:

```
  jcup generate json-to-dto name-resource/name-dto
```
tambien podemos utilizar el shorthand:
```
  jcup g jtd name-resource/name-dto
```
JCUP utiliza la libreria <a target="_blank" href="https://quicktype.io/"> quicktype</a> para realizar el parseo y una vez obtenida la respuesta construirá los archivos que sean necesarios por usted.

## Agregando Seguridad

