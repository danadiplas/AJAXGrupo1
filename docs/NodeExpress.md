# Introducción

Node.js es un entorno de tiempo de ejecución de JavaScript, de ahí su terminación ".js". Este entorno de tiempo es open source, es decir, de código abierto, multiplataforma y que se ejecuta del lado del servidor.

## Programación asíncrona

Uno de los puntos fuertes de Node.js es Event Loop, también conocido como Bucle de eventos, un modelo que permite gestionar una gran cantidad de eventos de forma asíncrona, ya que se ejecutan de forma independiente y sin interferir unos en otros.

Para conseguir esto, Node.js ha modificado la forma en la que se realizan las conexiones al servidor. En vez de generar un hilo para cada cliente, algo que resulta muy ineficaz debido al alto consumo de memoria RAM ante múltiples conexiones, utiliza un modelo en el que genera un evento para cada petición que se gestiona de manera independiente y sin bloqueos.

## Para qué sirve Node.js

Node.js sirve para crear sitios web dinámicos muy eficientes, escritos con el lenguaje de programación JavaScript. Normalmente, los desarrolladores se decantan por este entorno de ejecución cuando buscan que los procesos se ejecuten de forma ágil y sin ningún tipo de bloqueo cuando las conexiones se multiplican.

Por ejemplo, en aplicaciones IoT (Internet de las cosas), aplicaciones de transmisión de datos, aplicaciones basadas en REST API o aplicaciones de mensajería instantánea lo más utilizado es Node.js, ya que resulta muy estable y rápido frente a miles de conexiones simultáneas.

Para hacerse una idea, estas aplicaciones y sitios web están ejecutados en Node.js:

- Twitter  
- Adobe  
- Spotify  
- Github.com  
- Nytimes.com  
- Medium.com  

---



# Express.js

Express.js, a veces también llamado "Express", es un framework de backend Node.js minimalista, rápido y similar a Sinatra, que proporciona características y herramientas robustas para desarrollar aplicaciones de backend escalables. Te ofrece el sistema de enrutamiento y características simplificadas para ampliar el framework con componentes y partes más potentes en función de los casos de uso de tu aplicación.

Express.js se utiliza para una amplia gama de cosas en el ecosistema JavaScript/Node.js — puedes desarrollar aplicaciones, endpoints de API, sistemas de enrutamiento y frameworks con él.

## Funcionamiento de Express

Dado que Express.js utiliza el modelo cliente-servidor para aceptar las peticiones de los usuarios y devolver las respuestas al cliente, su funcionamiento no es muy diferente del de otros frameworks populares, como Laravel.

Cuando un usuario envía una petición desde su navegador web escribiendo la dirección de un sitio web, el navegador envía una petición HTTP a la aplicación/servidor (muchas aplicaciones creadas con Express.js están alojadas en algún lugar de la nube).

El servidor recibirá la petición a través de una de sus rutas y la procesará utilizando el controlador que coincida con la ruta solicitada.

Tras el procesamiento, el servidor enviará una respuesta al cliente utilizando HTTP. La respuesta devuelta al cliente puede ser un texto estándar, una página HTML dinámica o datos JSON.

## Instalación de Express

### Ejemplo de "Hello World"

1. Crea un directorio denominado `myapp`, accede a él y ejecuta:

   ```sh
   npm init
   ```

2. Instala Express como dependencia:

   ```sh
   npm install express
   ```

3. Crea un archivo denominado `app.js` y añade el siguiente código:

   ```js
   const express = require('express')
   const app = express()
   const port = 3000

   app.get('/', (req, res) => {
     res.send('Hello World!')
   })

   app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
   })
   ```

4. Ejecuta la aplicación con el siguiente comando:

   ```sh
   node app.js
   ```

5. Carga [http://localhost:3000/](http://localhost:3000/) en un navegador para ver la salida.

### Ejemplo de un server pequeño con peticiones "Get, Post, Put y Patch"

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  console.log(`Solicitud recibida en: ${req.url}`);
  next();
});

// Ruta GET en la raíz
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express.js!');
});

// Ruta POST para usuarios
app.post('/usuarios', (req, res) => {
  res.send('Información de usuario recibida y procesada');
});

// Ruta dinámica para usuarios
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Solicitado usuario con ID: ${id}`);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

```

## Bibliografía

- [Lucushost](https://www.lucushost.com/blog/que-es-node-js/)
- [MDN Express](https://developer.mozilla.org/es/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/Introduction)
- [Kinsta](https://kinsta.com/es/base-de-conocimiento/que-es-express/)
- [Luis Llamas](https://www.luisllamas.es/como-usar-expressjs-con-nodejs/#ejemplo-completo-de-aplicación-expressjs)

