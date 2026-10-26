const express = require('express');
const cors = require('cors');
require('dotenv').config();

const canchasRoutes = require('./src/routes/canchas');
const usuariosRoutes = require('./src/routes/usuarios');
const reservasRoutes = require('./src/routes/reservas');

const app = express();

app.use(cors({
  origin: ['https://canchapp-blue.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/canchas', canchasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenidos a App de turnos de CANCHA' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;