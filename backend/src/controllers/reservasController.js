const conexion = require('../db');

const getReservas = (req, res) => {
  const sql = `
    SELECT r.id, r.fecha, r.hora_inicio, r.hora_fin, r.estado,
           u.nombre AS usuario, c.nombre AS cancha, c.tipo, c.precio_por_hora
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.id
    JOIN canchas c ON r.cancha_id = c.id
  `;
  conexion.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getReservasByUsuario = (req, res) => {
  conexion.query(
    'SELECT * FROM reservas WHERE usuario_id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

const createReserva = (req, res) => {
  const { usuario_id, cancha_id, fecha, hora_inicio, hora_fin } = req.body;

  const sqlVerificar = `
    SELECT * FROM reservas 
    WHERE cancha_id = ? AND fecha = ? AND estado != 'cancelada'
    AND ((hora_inicio < ? AND hora_fin > ?))
  `;

  conexion.query(sqlVerificar, [cancha_id, fecha, hora_fin, hora_inicio], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: 'La cancha no está disponible en ese horario' });

    conexion.query(
      'INSERT INTO reservas (usuario_id, cancha_id, fecha, hora_inicio, hora_fin) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, cancha_id, fecha, hora_inicio, hora_fin],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Reserva creada', id: results.insertId });
      }
    );
  });
};

const cancelarReserva = (req, res) => {
  conexion.query(
    "UPDATE reservas SET estado = 'cancelada' WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: 'Reserva cancelada' });
    }
  );
};

module.exports = { getReservas, getReservasByUsuario, createReserva, cancelarReserva };