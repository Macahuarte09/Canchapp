const conexion = require('../db');

const getCanchas = (req, res) => {
  conexion.query('SELECT * FROM canchas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const createCancha = (req, res) => {
  const { nombre, tipo, precio_por_hora } = req.body;
  conexion.query(
    'INSERT INTO canchas (nombre, tipo, precio_por_hora) VALUES (?, ?, ?)',
    [nombre, tipo, precio_por_hora],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Cancha creada', id: results.insertId });
    }
  );
};

const updateCancha = (req, res) => {
  const { nombre, tipo, precio_por_hora, activa } = req.body;
  conexion.query(
    'UPDATE canchas SET nombre=?, tipo=?, precio_por_hora=?, activa=? WHERE id=?',
    [nombre, tipo, precio_por_hora, activa, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Cancha actualizada' });
    }
  );
};

const deleteCancha = (req, res) => {
  conexion.query('DELETE FROM canchas WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Cancha eliminada' });
  });
};

module.exports = { getCanchas, createCancha, updateCancha, deleteCancha };