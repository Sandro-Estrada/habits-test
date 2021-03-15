require("dotenv").config();
const express = require("express");
const http = require("http");

const { errorHandlerMiddleware } = require('./middlewares')

// Variables de entorno
const PORT_HTTP = process.env.PORT || 4010;

// Rutas
const {
  adminRoutes,
  medicamentRoutes
} = require('./routes')

const app = express();

app.use(express.json()).use(express.urlencoded({ extended: false }));

//configurar cabeceras http
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methods"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

const version = '/v1'
app
  .use(`${version}/admin`, adminRoutes)
  .use(`${version}/medicament`, medicamentRoutes)
  .use(errorHandlerMiddleware)

const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  }
});

 io.on('connection', (socket) => { 
   console.log("------------socket-----------------")
   //socket.emit('notificación', {event: 'delete'})
 })

httpServer.listen(PORT_HTTP, () =>
  console.log(`Server http app listening on port ${PORT_HTTP}!`)
);

app.io = io
module.exports = app;
