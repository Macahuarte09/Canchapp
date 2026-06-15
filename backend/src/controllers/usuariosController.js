const conexion = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = (req, res) => {
  const { nombre, email, password, telefono } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err.message });

    conexion.query(
      'INSERT INTO usuarios (nombre, email, password_hash, telefono) VALUES (?, ?, ?, ?)',
      [nombre, email, hash, telefono],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'Usuario registrado', id: results.insertId });
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const usuario = results[0];

    bcrypt.compare(password, usuario.password_hash, (err, match) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ mensaje: 'Login exitoso', token });
    });
  });
};

module.exports = { register, login };