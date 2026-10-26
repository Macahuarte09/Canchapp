import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API = 'https://canchapp-158d.vercel.app/api';

function getUsuarioId(token) {
  try {
    return JSON.parse(atob(token.split('.')[1])).id;
  } catch {
    return null;
  }
}

function NuevaReserva() {
  const location = useLocation();
  const navigate = useNavigate();
  const [canchas, setCanchas] = useState([]);
  const [canchaId, setCanchaId] = useState(location.state?.canchaId ?? '');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');
  const usuarioId = token ? getUsuarioId(token) : null;

  useEffect(() => {
    if (!usuarioId) {
      navigate('/');
      return;
    }
    axios.get(`${API}/canchas`)
      .then((res) => setCanchas(res.data))
      .catch((err) => console.error(err));
  }, [usuarioId, navigate]);

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
      navigate('/reservas');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al crear la reserva');
    }
  };

  if (!usuarioId) return null;

  return (
    <div>
      <h2>Hacer una reserva</h2>
      <button onClick={() => navigate('/canchas')}>Volver</button>
      {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
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
    </div>
  );
}

export default NuevaReserva;