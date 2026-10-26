import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://canchapp-158d.vercel.app/api';

function getUsuarioId(token) {
  try {
    return JSON.parse(atob(token.split('.')[1])).id;
  } catch {
    return null;
  }
}

function Reservas() {
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [canchaId, setCanchaId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esError, setEsError] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const usuarioId = token ? getUsuarioId(token) : null;

  const cargarReservas = useCallback(() => {
    axios.get(`${API}/reservas/usuario/${usuarioId}`)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, [usuarioId]);

  useEffect(() => {
    if (!usuarioId) {
      navigate('/');
      return;
    }
    axios.get(`${API}/canchas`)
      .then((res) => setCanchas(res.data))
      .catch((err) => console.error(err));
    cargarReservas();
  }, [usuarioId, navigate, cargarReservas]);

  const handleReserva = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/reservas`, {
        usuario_id: usuarioId,
        cancha_id: canchaId,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin
      });
      setEsError(false);
      setMensaje('Reserva creada exitosamente!');
      cargarReservas();
    } catch (err) {
      setEsError(true);
      setMensaje(err.response?.data?.error || 'Error al crear la reserva');
    }
  };

  const handleCancelar = async (id) => {
    try {
      await axios.put(`${API}/reservas/cancelar/${id}`);
      setReservas(reservas.map((r) => (r.id === id ? { ...r, estado: 'cancelada' } : r)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!usuarioId) return null;

  return (
    <div>
      <h2>Hacer una reserva</h2>
      {mensaje && <p style={{ color: esError ? 'red' : 'green' }}>{mensaje}</p>}
      <form onSubmit={handleReserva}>
        <select value={canchaId} onChange={(e) => setCanchaId(e.target.value)} required>
          <option value="">Elegí una cancha</option>
          {canchas.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre} - ${c.precio_por_hora}/hora</option>
          ))}
        </select>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
        <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
        <button type="submit">Reservar</button>
      </form>

      <h2>Mis reservas</h2>
      {reservas.length === 0 && <p>No tenés reservas todavía.</p>}
      {reservas.map((r) => (
        <div key={r.id}>
          <p>Cancha ID: {r.cancha_id} | Fecha: {String(r.fecha).slice(0, 10)} | {r.hora_inicio} - {r.hora_fin} | Estado: {r.estado}</p>
          {r.estado !== 'cancelada' && (
            <button onClick={() => handleCancelar(r.id)}>Cancelar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reservas;