# Medicamentos

Esté proyecto fue creado para generar una **API** para la prueba de **Habits**.

## NOTA IMPORTANTE
Todos los endpoints están protegidos por JWT por lo que hay que crear un administrador desde la [API](https://documenter.getpostman.com/view/4955309/Tz5qaxaM).

```
POST - http://localhost:4010/v1/admin
BODY - {
    "user": "test",
    "password": "test"
}
```

## Prerequisitos

Para correr el servidor es necesario tener instalado:

- **NodeJS** en la versión **13.14.x**.
- **NPM** en la versión **6.14.x**.

A su vez, si se cuenta con **NVM** existe un archivo que indica la versión de **NodeJS**
basta con tener instalada la versión y ejecutar dentro del proyecto:

```
nvm use
```

## Configuraciones ⚙

### Base de datos

La base de datos fue simulada en memoria, y cada registro es controlado por un modelo.

### Variables de entorno

Esté proyecto usa dotenv para manejar variables de entorno.
En la parte principal del proyecto, hay un archivo llamado **.env** donde podremos configurar
nuestras variables de entorno.
Por defecto, el puerto es manejado en 4010.

## Correr el servidor

Una vez instalado y configurado, los siguientes comandos nos servirán para correr el servidor:

```
npm install
```

```
npm run migrate
```
El proyecto usa **nodemon** para facilitar el desarrollo, por ello para correr el servidor con
esta herramienta ejecutamos:

```
npm run start:dev
```

Si no es necesario correr el servidor con **nodemon**, puedes correrlo de la siguiente manera:

```
npm run start
```

## SOCKETS
Esté proyecto implementa sockets mediante [socket.io](https://socket.io/).
### Eventos
Se creó un único evento llamada **notificación** para el manejo de notificaciones.
### EMITS
Al **crear** o **eliminar** se emite información para que frontend pueda saber en todo momento si se ha agregado un medicamento nuevo o se ha eliminado.

#### EMIT al crear - estructura
```json
{
    "event": "create",
    "id": "number",
    "name": "string",
    "type": "string",
    "quantity": "number",
    "createdAt": "string",
    "price": "number",
    "location": "string",
    "updatedAt": "string"
}
```

#### EMIT al eliminar - estructura
```json
{
    "event": "delete"
}
```

## Documentación
La documentación de la **API** la podemos localizar en [POSTMAN](https://documenter.getpostman.com/view/4955309/Tz5qaxaM).
Dentro de esté proyecto también existe una carpeta llamada **docs** con información gráfica.
1. [Diagrama de flujo de sockets](docs/Diagrama_flujo_socket.png)

## Licencia

El proyecto usa una licencia de tipo [ISC](https://opensource.org/licenses/ISC)

## Autor

[Sandro Estrada](https://www.linkedin.com/in/sandro-estrada-elizondo-1b5411171/)
