import { useState } from "react";
import { usersApi } from "../api/apiUsers.js";
import { saveToStorage } from "../api/storage.js";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.scss";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await usersApi.login(email, password);

      if (!user) {
        setError("Credenciales incorrectas");
        return;
      }
      saveToStorage("user", user);
      onLogin(user);
      navigate("/tickets");
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError("Error en login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Iniciar Sesión</h2>
      {error && <p className="login-error">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

      {/* 🔹 Nuevo botón para registro */}
      <p className="register-text">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
}
