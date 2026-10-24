const express = require('express');
const cors = require('cors');
require('dotenv').config();

const canchasRoutes = require('./src/routes/canchas');
const usuariosRoutes = require('./src/routes/usuarios');
const reservasRoutes = require('./src/routes/reservas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/canchas', canchasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);

app.get('/', (req, res) => {
res.json({ mensaje: 'Bienvenidos a App de turnos de CANCHA' });
});

module.exports = app;
