const express = require('express');
const router = express.Router();

// Ruta para mostrar todos los eventos
router.get('/', (req, res) => {
  res.send('Listar todos los eventos');
});

// Ruta para mostrar un evento específico
router.get('/:fecha', (req, res) => {
  const fecha = req.params.fecha;
  res.send(`Mostrar evento en la fecha ${fecha}`);
});

// Ruta para crear un nuevo evento
router.post('/', (req, res) => {
  res.send('Crear un nuevo evento');
});

// Ruta para actualizar un evento existente
router.put('/:fecha', (req, res) => {
  const fecha = req.params.fecha;
  res.send(`Actualizar evento en la fecha ${fecha}`);
});

// Ruta para eliminar un evento existente
router.delete('/:fecha', (req, res) => {
  const fecha = req.params.fecha;
  res.send(`Eliminar evento en la fecha ${fecha}`);
});

module.exports = router;
// Importar el modelo de eventos (supongamos que tienes un modelo llamado Evento)
const Evento = require('../models/evento');

// Controlador para listar todos los eventos
const listarEventos = async (req, res) => {
  try {
    // Consultar todos los eventos en la base de datos
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    console.error('Error al listar eventos:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al listar eventos' });
  }
};

// Controlador para mostrar un evento específico
const mostrarEvento = async (req, res) => {
  const fecha = req.params.fecha;
  try {
    // Consultar el evento en la base de datos utilizando la fecha
    const evento = await Evento.findOne({ fecha });
    if (!evento) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (error) {
    console.error('Error al mostrar evento:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al mostrar el evento' });
  }
};

// Controlador para crear un nuevo evento
const crearEvento = async (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { fecha, titulo, descripcion } = req.body;
  try {
    // Verificar si el evento ya existe en la base de datos
    const eventoExistente = await Evento.findOne({ fecha });
    if (eventoExistente) {
      return res.status(400).json({ mensaje: 'El evento ya existe' });
    }
    // Crear un nuevo evento utilizando el modelo de evento
    const nuevoEvento = new Evento({ fecha, titulo, descripcion });
    // Guardar el nuevo evento en la base de datos
    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear el evento' });
  }
};

// Controlador para actualizar un evento existente
const actualizarEvento = async (req, res) => {
  const fecha = req.params.fecha;
  // Obtener los datos actualizados del cuerpo de la solicitud
  const { titulo, descripcion } = req.body;
  try {
    // Buscar el evento en la base de datos y actualizarlo
    const eventoActualizado = await Evento.findOneAndUpdate({ fecha }, { titulo, descripcion }, { new: true });
    if (!eventoActualizado) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    res.json(eventoActualizado);
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al actualizar el evento' });
  }
};

// Controlador para eliminar un evento existente
const eliminarEvento = async (req, res) => {
  const fecha = req.params.fecha;
  try {
    // Buscar y eliminar el evento en la base de datos
    const resultado = await Evento.findOneAndDelete({ fecha });
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
    res.json({ mensaje: 'Evento eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    res.status(500).json({ mensaje: 'Ocurrió un error al eliminar el evento' });
  }
};
// Controlador para listar todos los eventos
const listarEventos = async (req, res, next) => {
    try {
      // Consultar todos los eventos en la base de datos
      const eventos = await Evento.find();
      res.json(eventos);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
};

module.exports = {
  listarEventos,
  mostrarEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento
};