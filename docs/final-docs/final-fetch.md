# FETCH

## ¿Qué es y para qué se utiliza?

Fetch es una API moderna proporcionada por los navegadores para realizar peticiones HTTP asíncronas de manera más cómoda y legible. La función `fetch()` permite enviar peticiones HTTP a cualquier API web y obtener una respuesta directamente desde los navegadores, haciéndola más potente, moderna y sencilla de aplicar que el antiguo `XMLHttpRequest`.

#### Síncrona 
```js
let request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/posts/1", false); // false = síncrono
request.send();
console.log(request.responseText); // No se ejecuta hasta recibir la respuesta
```

#### Asíncrona (Fetch)
##### ejemplo utilizando then:
```js
const promise = fetch('https://api.example.com/data');

promise.then(response => {

console.log(response.status);

})

.catch(error => {

console.log("Error:", error);

});
```
##### ejemplo utilizando async/await:
```js

async function obtenirDades() {

try {

const response = await fetch('https://api.example.com/data');

if (!response.ok) {

throw new Error('Error');

}

} catch (error) {

console.log('Error:', error);

}

}

obtenirDades();
```

## Ventajas sobre `XMLHttpRequest`

Fetch ofrece varias ventajas significativas sobre `XMLHttpRequest`:

**Soporte nativo de Promesas**: La API Fetch utiliza promesas de manera nativa, lo que facilita el manejo de peticiones asíncronas y mejora la legibilidad del código.
    
**Mayor compatibilidad con** `async/await`: La compatibilidad con `async/await` permite escribir código asíncrono de manera más sencilla y clara.
    
**Más versatilidad con** `Headers`**,** `Request`**, y** `Response`: Fetch proporciona objetos como `Headers`, `Request`, y `Response`

## ¿Qué devuelve `fetch`?
`fetch()` retorna una promesa que, cuando se resuelve con éxito, devuelve un objeto de tipo `Response`. Este objeto tiene métodos para leer la respuesta del servidor, como `json()`, `text()`, `blob()`, etc.

  

Si la solicitud es exitosa, la promesa se resuelve, pero aunque la respuesta sea un error HTTP (por ejemplo, 404 o 500), la promesa **no** se rechazará. En lugar de eso, se resuelve con un objeto `Response` que contiene la información sobre el error. Para verificar si la respuesta fue exitosa, deberías comprobar la propiedad `ok` del objeto `Response`.


## ¿Cómo controlarlo con `try` y `catch`?

Para manejar la promesa de manera efectiva y capturar errores, podemos usar un bloque `try` y `catch`, junto con `async/await`. Aquí tienes un ejemplo de cómo hacerlo:

  

### Ejemplo de uso básico con `async/await`:
```javascript

async function obtenerDatos() {
try {
// Hacemos la solicitud fetch y esperamos la respuesta
const respuesta = await fetch('https://api.ejemplo.com/datos');
// Si la respuesta no es exitosa (por ejemplo, un 404 o 500), lanzamos un error

if (!respuesta.ok) {
throw new Error(`Error en la solicitud: ${respuesta.status}`);
}
// Si la respuesta es exitosa, convertimos la respuesta a JSON

const datos = await respuesta.json();
// Aquí ya puedes trabajar con los datos obtenidos
console.log(datos);
} catch (error) {
// Si ocurre un error (como problemas de red o un error de la respuesta)
console.error('Hubo un problema con la solicitud:', error);
	}
}
obtenerDatos();
```
## Métodos HTTP con Fetch

Fetch es ideal para implementar operaciones CRUD con una API.

#### CREATE

Para utilizar el método POST para la creación de nuevos datos, se pone un segundo parámetro para indicar la definición de la propiedad method, el método de la petición:
```js
fetch('https://jsonplaceholder.typicode.com/users', {

method: 'POST',

})

.then(resposta => resposta.json())

.then(dades => console.log(dades))
```
  
Tanto en POST como en PUT debe configurarse el encabezamiento de la petición (header) y las propiedades del cuerpo (body).

```js
fetch('https://api.example.com/data', {

method: 'POST',

headers: { 'Content-Type': 'application/json' },

body: JSON.stringify({ name: 'Element nou' })

})

.then(response => response.json())

.then(data => console.log('Creat:', data))

.catch(error => console.error('Error:', error));
```
  

-   method: 'POST': Indica que estamos enviando datos.
    
-   headers: Define el tipo de contenido enviado de la solicitud (JSON). Se añade la propiedad Content-Type y su valor de configuración.
    
-   body: Datos que se envían al servidor. En este caso, el objeto JavaScript se convierte en una cadena JSON. 

#### READ

Cuando la petición es GET para obtener los datos, no es necesario poner el segundo parámetro de la función, ya que por defecto el método es GET.
```js
async function obtenirPublicacions() {

try {

let response = await fetch("https://jsonplaceholder.typicode.com/posts");

  

let data = await response.json();

  

console.log("Publicacions:", data);

} catch (error) {

console.error("Error al obtenir dades:", error);

}

}
 
obtenirPublicacions();
```

#### UPDATE

Al utilizar PUT para actualizar datos existentes, se utiliza la misma sintaxis que en el método POST:
```js
async function actualitzarPost(id) {

try {

let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {

method: "PUT",

headers: { "Content-Type": "application/json" },

body: JSON.stringify({

title: "Título actualizado",

body: "Nuevo contenido",

userId: 1

})

});

  

let data = await response.json();

  

console.log("Registro actualizado:", data);

} catch (error) {

console.error("Error al actualizar registro:", error);

}

}

  

actualitzarPost(1);
```

#### DELETE

Al realizar una petición DELETE sólo especifica la URL del recurso y el método de la petición:
```js
fetch('https://api.example.com/data/1', {

method: 'DELETE'

})

.then(response => response.json())

.then(data => console.log('Eliminat:', data))

.catch(error => console.error('Error:', error));
  ```

-   method: 'DELETE': Indica que se desea eliminar un elemento.
    
-   url: Contiene el ID del elemento a eliminar (/data/1).

## Interfaces Relacionadas con fetch
  
-   Request: Permite crear peticiones personalizadas
    
-   Response: Sirve para manejar las respuestas del servidor
    
-   Headers: Permite manipular cabeceras HTTP
    
-   Body: Maneja los datos enviados/recibidos  

   
#### Ejemplo con Request  
  ```js
const request = new Request('https://jsonplaceholder.typicode.com/posts',{

method: 'GET',

headers: new Headers{{ 'Content-Type': 'application/json' })

});

  

fetch(request)

.then(response => response.json())

.then(data => console.log('Datos obtenidos:', data))

.catch(error => console.error('Error en la petición:', error));

}
```
  

En este ejemplo:

-   Se usa new Request() para definir una solicitud personalizada
    
-   Se agregan Headers con Content-Type: application/json
    
-   Se ejecuta fetch(request), obteniendo la respuesta en formato JSON  
     
#### Ejemplo con Response  
  
 ```js

fetch('https://jsonplaceholder.typicode.com/posts/1')

.then(response = > {

console.log('Status', response.status);

console.log('Headers: ', response.headers);

return response.json();

})

.then(data => console.log('Data: ', data))

.catch(error => console.error('Error:', error));
```

  
En este ejemplo:

  

-   Se imprime el status (si sale 200 significa que ha habido éxito)
    
-   Se accede a headers para ver las cabeceras HTTP de la respuesta
    
-   Se convierte la respuesta en JSON y se muestra en consola  
      
### Ejemplo con Headers Personalizados  
  
```js
let headers = new Headers();

headers.append('Content-Type', 'application/json');

headers.append('Authorization', 'Bearer token123');

  

fetch('https://jsonplaceholder.typicode.com/posts', {

method: 'GET',

headers: headers

})

.then(response => response.json())

.then(data => console.log(data))

.catch(error => console.error('Error: ', error));

  ```

En este ejemplo:

-   Se crean Headers y se agregan Content-Type y Authorization.
    
-   Authorization se usa para enviar un token de autenticación (Bearer token123).
    
-   Se realiza una petición GET con estos encabezados.  
  
#### Ejemplo con Body  
  
```js
fetch('https://jsonplaceholder.typicode.com/posts', {

method: 'POST',

headers: {

'Content-Type': 'application/json'

},

body: JSON.stringify({

title: 'Nuevo Post',

body: 'Este es el contenido del post',

userId: 1

})

})

.then(response => response.json())

.then(data => console.log('Post creado:', data))

.catch(error => console.error('Error:', error));
```

En este ejemplo:

-   Se envían datos en formato JSON con body: JSON.stringify({...})
    
-   Se especifica en los headers que el contenido es application/json
    
-   Se maneja la respuesta con then() y errores con catch()  
    
Las acciones que puedes hacer son recuperar, establecer, agregar y eliminar cabeceras de la lista de la lista de cabeceras de la solicitud.

## KAHOOT 
https://create.kahoot.it/my-library/kahoots/drafts


## EJERCICIO - EXPLICACIÓN

### Generador de frases célebres

Crea un generador de frases que al hacer click en un botón se muestre una frase y su autor, cada que se pulse el botón la frase cambiará.

Pasos a seguir:

1. Crear un **documento HTML** que contenga una estructura básica para mostrar las frases

El documento debe tener:
- Un **botón** para obtener la nueva frase
- Un **div** para mostrar las frases

2. Crear un archivo **main.js**

	2.1. Capturar el **click** del botón
	2.2 Crear una función **"getRandomQuote()"**
	2.3 El click debe de **llamar a la función** "getRandomQuote()" cada que se pulse
	2.4 Hacer una **petición con Fetch** a la API → [https://dummyjson.com/quotes/random](https://dummyjson.com/quotes/random)
	2.5 Convertir la respuesta a **.json** (response.json)
	2.6 **Pintar el resultado** en el HTML