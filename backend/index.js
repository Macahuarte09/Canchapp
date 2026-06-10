const express = require('express');
const cors = require('cors');
require('dotenv').config();

const canchasRoutes = require('./src/routes/canchas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/canchas', canchasRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenidos a App de turnos de CANCHA' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});