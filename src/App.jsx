import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./styles/navbar-footer.scss";
import Navbar from "./components/Navbar";
import RenderTickets from "./components/RenderTickets";
import Dashboard from "./components/DashboardTickets";
import Footer from "./components/Footer";
import { loadFromStorage, removeFromStorage } from "./api/storage";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(() => loadFromStorage("user", null));

  const handleLogout = () => {
    removeFromStorage("user"); 
    setUser(null);             
  };

  return (
    <Router>
      <div className="app-container">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to={user ? "/tickets" : "/login"} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/tickets" /> : <Login onLogin={setUser} />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/tickets" /> : <Register />}
          />
          <Route
            path="/tickets"
            element={
              user ? (
                <>
                  <RenderTickets />
                  <Dashboard />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
