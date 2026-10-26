import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Canchas() {
  const [canchas, setCanchas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://canchapp-158d.vercel.app/api/canchas')
      .then((res) => setCanchas(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Canchas disponibles</h2>
      <button onClick={() => navigate('/reservas')}>Ver mis reservas</button>
      {canchas.map((cancha) => (
        <div key={cancha.id}>
          <h3>{cancha.nombre}</h3>
          <p>Tipo: {cancha.tipo}</p>
          <p>Precio por hora: ${cancha.precio_por_hora}</p>
          <button onClick={() => navigate('/reservar', { state: { canchaId: cancha.id } })}>
            Reservar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Canchas;