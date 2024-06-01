const express = require('express');
const eventosRouter = require('./routes/eventos');

const app = express();

// Montar las rutas de eventos en la aplicación
app.use('/eventos', eventosRouter);

// Otro middleware y configuraciones de la aplicación

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
  });

module.exports = app;