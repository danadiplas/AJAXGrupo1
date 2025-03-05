# API REST

REST, o transferencia de estado representacional es un tipo de arquitectura de software que se originó en el año 2000, en una tesis doctoral escrita por Roy Fielding. Pero, actualmente, el término REST se utiliza para describir cualquier sistema que utilice el protocolo HTTP para obtener datos.

# ¿QUE ES UNA API?

Las APIs son mecanismos que permiten a dos componentes de software comunicarse entre sí mediante un conjunto de definiciones y protocolos. 

Esto se hace mediante un conjunto de llamadas a ciertas bibliotecas que ofrecen acceso a ciertos servicios. Uno de los principales propósitos de una API consiste en proporcionar un conjunto de funciones de uso general, por ejemplo, para dibujar ventanas o iconos en la pantalla

# PRINCIPIOS DEL DISEÑO REST

REST es una arquitectura muy flexible, que permite a los programadores utilizar prácticamente cualquier lenguaje de programación y acepta diversos formatos de datos. Su único requisito es alinearse con estas cinco restricciones arquitectónicas:

- **Interfaz uniforme:** todas las solicitudes a la API para el mismo recurso deben tener el mismo aspecto. 

- **Desacoplamiento cliente-servidor:** debe haber separación total entre el cliente y el servidor.

- **Sin estado:** REST hace peticiones sin estado. Los protocolos sin estado son un tipo de protocolos en los que cada petición se trata como una transacción independiente que no tiene relación con las solicitudes anteriores. Este tipo de protocolos no necesitan guardar datos sobre la sesión.

- **Capacidad de almacenamiento en caché:** cuando sea posible, los recursos deben almacenarse en el caché, sea de parte del servidor o del cliente.

- **Arquitectura del sistema en capas:** en las API REST, las llamadas y respuestas pasan por diferentes capas, como la seguridad, la aplicación y la lógica empresarial. Estas capas se mantienen invisibles para el cliente.

# FUNCIONAMIENTO DE LA API REST

Generalmente, los pasos para para hacer una llamada a una API REST son:

* El cliente envía una **solicitud** al servidor.   
* El servidor **autentica** el cliente y asegura que este tiene derecho a hacer la solicitud.  
* El servidor **recibe** la solicitud y la procesa.  
* Este **devuelve** una respuesta al cliente. Esta respuesta contiene información que dice al cliente si la solicitud se procesó de manera correcta y le muestra al cliente los datos que ha solicitado. 

## COMPONENTES DE UNA SOLICITUD

Las API REST requieren que las solicitudes contengan los siguientes componentes principales:

### IDENTIFICADOR ÚNICO DE RECURSOS

En los servicios REST, por lo general el servidor identifica cada recurso con un localizador uniforme de recursos (URL), que especifica la ruta hacia dicho recurso.

### MÉTODO

A menudo se implementa la API REST mediante el uso del protocolo HTTP. Este protocolo informa al servidor lo que debe hacer con el recurso. A continuación, se indican los cuatro métodos de HTTP más comunes:

#### GET

Este método se utiliza para pedir recursos ubicados en una URL del servidor. También se pueden enviar parámetros con la solicitud para filtrar los recursos que se quiera recibir.

#### POST

POST se utiliza para enviar datos al servidor. Se tiene que tener en cuenta que si se llama varias veces, se creará el mismo recurso todas las veces.

#### PUT

El modo PUT reemplaza todas las representaciones actuales del recurso de destino. A diferencia del POST, si se llama varias veces, siempre se modificará el mismo recurso, en vez de crear uno nuevo.

#### DELETE

Los clientes utilizan la solicitud DELETE para eliminar un recurso. Es importante notar que el usuario necesita la autenticación adecuada para hacer esto. 

### ENCABEZADOS HTTP

Los encabezados de solicitudes son los metadatos que se intercambian entre el cliente y el servidor. Por ejemplo, el encabezado de la solicitud indica el formato de la solicitud y la respuesta, proporciona información sobre el estado de la solicitud, etc.

## COMPONENTES DE UNA RESPUESTA

### LÍNEA DE ESTADO

La línea de estado contiene un código de estado que comunica si la solicitud se procesó de manera correcta o dio error. Los tipos de códigos de estado son, explicados generalmente:

* 1XX, respuesta informativa.  
* 2XX, petición correcta.  
* 3XX, redirecciones.  
* 4XX, errores de parte del cliente.  
* 5XX, errores de parte del servidor.


### CUERPO DEL MENSAJE 

El cuerpo de la respuesta contiene la representación del recurso. Estos recursos, dependiendo de lo que sea más adecuado, pueden ser en formato JSON o XML.

### ENCABEZADOS

La respuesta también contiene encabezados o metadatos acerca de la respuesta, como el servidor, la codificación o el tipo de contenido. 