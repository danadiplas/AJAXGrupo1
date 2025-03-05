# FETCH
## Què és i per què s’utilitza?

És un sistema més modern i basat en promeses javascript per realitzar peticions HTTP asíncrones de manera més còmode i llegible. La promesa es resol (és acceptada) quan el servidor respon, independentment de si la resposta és exitosa (codi 200) o un error HTTP (com 404 o 500). Només es rebutja en casos de fallada de xarxa o problemes crítics com un domini inexistent.

## Sintaxi

S’ha de cridar al mètode fetch i passar-li per paràmetre la URL de la petició que es vol realitzar:


### exemple utilitzant then:
```js
const promise = fetch('https://api.example.com/data');

promise.then(response => {

console.log(response.status);

})

.catch(error => {

console.log("Error:", error);

});
```
### exemple amb async/await:
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
## Que retorna la resposta?

La resposta d’una petició fetch() conté diverses propietats útils. Algunes de les més comunes són:

**response.ok:** Un valor booleà que és true si el codi de l'estat HTTP és a la gamma 200-299 (codi d'èxit).

**response.status:** El codi d'estat HTTP (per exemple, 200, 404, 500).

**response.json():** Un mètode per convertir la resposta a format JSON (si el servidor retorna dades en aquest format).

**response.text():** Un mètode per obtenir la resposta com a text pla.

**response.blob():** Un mètode per obtenir la resposta com a "blob" (per exemple, per treballar amb imatges o arxius).

  

## Quan utilitzar XMLHttpRequest?

Si necessites compatibilitat amb navegadors antics, especialment versions antigues d'Internet Explorer o si necessites un control molt específic sobre el flux de la petició (com a peticions síncrones o el seguiment detallat del procés de la petició).


## Quan utilitzar fetch()?

Quan estàs treballant en un projecte modern que no necessita suport per a navegadors antics, quan vols un codi més net i fàcil de llegir o quan treballes amb APIs modernes que utilitzen promeses i async/await.

  
## Errors de Cross-Origin Resource Sharing (CORS)

Quan realitzem peticions a un servidor que no està al mateix domini que la nostra aplicació (per exemple, des d’un servidor local a un servidor remot), podem trobar errors relacionats amb CORS. El servidor ha de permetre explícitament que es facin peticions des d'altres dominis.

Si el servidor no està configurat per a acceptar peticions CORS, veurem errors de seguretat i no podrem obtenir les dades desitjades.

## Com evitar errors de CORS amb fetch()?

### Configura el servidor per permetre CORS:

Ens hem d’assegurar de que el servidor al qual estem fent la petició inclogui els encapçalaments CORS adequats (com Access-Control-Allow-Origin) a les respostes.

### Utilitza un servidor intermig:

Si no pots controlar el servidor, pots utilitzar un servidor intermediari (proxy) que faci la petició per tu i afegeixi els encapçalaments CORS correctes a la resposta.

### Evita peticions preflight:

Si el teu servidor accepta només peticions simples (com GET o POST amb encapçalaments estàndard), pots evitar la petició preflight. Això redueix la complexitat de la sol·licitud.

  
## Petició preflight

La petició preflight és un mecanisme de seguretat utilitzat en les peticions d'origen creuat (cross-origin) per determinar si un servidor accepta una petició HTTP específica. Aquesta petició és enviada pel navegador abans de la petició principal (per exemple, una petició POST o PUT), i la seva finalitat és verificar que el servidor permet fer peticions d'origen creuat amb els encapçalaments i mètodes especificats.

  

## EXERCICI

### Generador de frases celebres

Fes un document HTML bàsic i una funció en un document JavaScript que et permetin utilitzar fetch per cridar aquesta API ([https://dummyjson.com/quotes/random](https://dummyjson.com/quotes/random)) i que et doni una frase diferent, amb el seu autor, cada vegada que li dones a un botó. Has de assegurar-te de que controles bé els errors i que sempre surti alguna cosa a la pantalla.

  

### Solució:

#### main.js

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXebFvbNQ_eCR1BIj9T1qddrufzx0o20FvH7BqHnFrFS2iYv7PPgGymRFcphniRrG3TGOz5qC6oRh_T-v6I7KV4h4X5CjCNzH8NfDEeQqSu6lJx2GNSSwNy1WuVQidPi5JmzyNLd?key=AuZqxU3lzBBqFtj1Mn4xb0Rr)

#### html

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXePn-MltqTKzxfF2YsVJsihQoUAZPIvpr0KkCnc-MwxrJcb4_4oEOCg5FaX85ApNYcU7jjZ79zxufkSMxroZEC20yb02a079I3tlVrtWn8Kxq7K1OpC6KRGyxopXTrh8d4gS3FS?key=AuZqxU3lzBBqFtj1Mn4xb0Rr)