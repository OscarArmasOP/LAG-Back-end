const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Configurando body-parser
//Extraer todo lo que enviemos de tipo json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//------Rutas------------
//Requerir rutas de nuestro archivo routes
require('./server/routes/usuarios')(app);
require('./server/routes/fotografias')(app);

app.get('*', (req, res) => {
    res.status(200).send({ message: "Bienvenido al servidor del oscarin" });
})

module.exports = app;