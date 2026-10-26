import { useEffect, useState } from 'react';
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
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const usuarioId = token ? getUsuarioId(token) : null;

  useEffect(() => {
    if (!usuarioId) {
      navigate('/');
      return;
    }
    axios.get(`${API}/reservas/usuario/${usuarioId}`)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, [usuarioId, navigate]);

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
      <h2>Mis reservas</h2>
      <button onClick={() => navigate('/canchas')}>Volver</button>
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