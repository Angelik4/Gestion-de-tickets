export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <img
        src="https://www.tuboleta.com/themes/custom/tu_boleta_theme/logo.png"
        alt="Logo tuboleta"
      />
      <div className="navbar__logo">
        Task<span className="navbar__highlight">Manager</span>
      </div>
      {user && (
        <button className="navbar__btnLogin" onClick={onLogout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}
