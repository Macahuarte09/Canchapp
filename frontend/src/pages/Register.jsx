import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
const [nombre, setNombre] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [telefono, setTelefono] = useState('');
const [error, setError] = useState('');

const navigate = useNavigate();

const handleRegister = async (e) => {
e.preventDefault();
setError('');


try {
  await axios.post(
    'https://canchapp-158.vercel.app/api/usuarios/register',
    { nombre, email, password, telefono }
  );

  navigate('/');
} catch (err) {
  console.error(
    'Error al registrarse:',
    err.response?.data || err.message
  );

  setError(
    err.response?.data?.error ||
    'Error al registrarse, intentá de nuevo'
  );
}


};

return ( <div> <h2>Registrarse</h2>


  {error && <p style={{ color: 'red' }}>{error}</p>}

  <form onSubmit={handleRegister}>
    <input
      type="text"
      placeholder="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      required
    />

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <input
      type="text"
      placeholder="Teléfono"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      required
    />

    <button type="submit">Registrarse</button>
  </form>

  <p>
    ¿Ya tenés cuenta? <a href="/">Iniciá sesión</a>
  </p>
</div>

);
}

export default Register;
