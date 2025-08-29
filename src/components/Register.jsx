import { useState } from "react";
import { usersApi } from "../api/apiUsers.js";
import "../styles/auth.scss";

export default function Register({ onRegister }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const newUser = { nombre, email, rol, password };
      const user = await usersApi.create(newUser);
      onRegister(user);
    } catch (err) {
      setError("Error creando usuario");
    }
  };


  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rol"
        value={rol}
        onChange={(e) => setRol(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
