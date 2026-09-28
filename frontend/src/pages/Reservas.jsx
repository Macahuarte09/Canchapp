import { useEffect, useState } from 'react';
import axios from 'axios';

function Reservas() {
  const [canchas, setCanchas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [canchaId, setCanchaId] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');
  const usuarioId = JSON.parse(atob(token.split('.')[1])).id;

  useEffect(() => {
    axios.get('http://localhost:3000/api/canchas')
      .then((res) => setCanchas(res.data))
      .catch((err) => console.error(err));

    axios.get(`http://localhost:3000/api/reservas/usuario/${usuarioId}`)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleReserva = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/reservas', {
        usuario_id: usuarioId,
        cancha_id: canchaId,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin
      });
      setMensaje('Reserva creada exitosamente!');
    } catch (err) {
      setMensaje(err.response?.data?.error || 'Error al crear la reserva');
    }
  };

  const handleCancelar = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/reservas/cancelar/${id}`);
      setReservas(reservas.map(r => r.id === id ? { ...r, estado: 'cancelada' } : r));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Hacer una reserva</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      <form onSubmit={handleReserva}>
        <select value={canchaId} onChange={(e) => setCanchaId(e.target.value)}>
          <option value="">Elegí una cancha</option>
          {canchas.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre} - ${c.precio_por_hora}/hora</option>
          ))}
        </select>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
        <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
        <button type="submit">Reservar</button>
      </form>

      <h2>Mis reservas</h2>
      {reservas.length === 0 && <p>No tenés reservas todavía.</p>}
      {reservas.map((r) => (
        <div key={r.id}>
          <p>Cancha ID: {r.cancha_id} | Fecha: {r.fecha} | {r.hora_inicio} - {r.hora_fin} | Estado: {r.estado}</p>
          {r.estado !== 'cancelada' && (
            <button onClick={() => handleCancelar(r.id)}>Cancelar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reservas;