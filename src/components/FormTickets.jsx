import { useState, useEffect } from "react";
import { ticketsApi } from "../api/apiTickets";
import { usersApi } from "../api/apiUsers";
import "../styles/modal-create.scss";

/* Aunque no se solicita en los requerimientos del proyecto , aqui decidi usar la informacion de los usuarios
poniendo en el formulario correo y rol, luego filtrando solo las etiquetas que corresponden especificamente al rol
esto evita que no tenga todas y que se asignen tareas que no corresponden al rol */

const ETIQUETAS = [
  "emails",
  "backend",
  "frontend",
  "refactor",
  "performance",
  "reportes",
  "pagos",
  "diseño",
  "crítico",
];

const ROL_ETIQUETAS = {
  "Backend Developer": ["backend", "emails", "reportes", "pagos", "performance"],
  "Frontend Developer": ["frontend", "diseño", "emails", "reportes"],
  "Fullstack Developer": ETIQUETAS,
  "QA Engineer": ["crítico", "reportes", "emails"],
  "Product Owner": ["reportes", "emails"],
};

export default function FormTickets({ ticket, onClose }) {
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    titulo: ticket?.titulo || "",
    descripcion: ticket?.descripcion || "",
    prioridad: ticket?.prioridad || "Media",
    estado: ticket?.estado || "Abierto",
    asignadoA: ticket?.asignadoA || "",
    etiquetas: ticket?.etiquetas || [],
  });

  useEffect(() => {
    if (ticket) {
      setLoading(true);
      usersApi
        .getAll()
        .then(setUsuarios)
        .catch((err) => console.error("Error cargando usuarios:", err))
        .finally(() => setLoading(false));
    }
  }, [ticket]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      if (checked) {
        return { ...prev, etiquetas: [...prev.etiquetas, value] };
      } else {
        return { ...prev, etiquetas: prev.etiquetas.filter((t) => t !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (ticket?.id) {
        const actualizado = {
          ...form,
          fechaCreacion: ticket.fechaCreacion,
          fechaActualizacion: new Date().toISOString(),
        };
        await ticketsApi.update(ticket.id, actualizado);
      } else {
        const nuevoTicket = {
          ...form,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString(),
        };
        await ticketsApi.create(nuevoTicket);
      }
      onClose();
    } catch (err) {
      console.error("Error guardando ticket:", err);
    }
  };

  const usuarioSeleccionado = usuarios.find((u) => u.email === form.asignadoA);
  const etiquetasPermitidas = usuarioSeleccionado
    ? ROL_ETIQUETAS[usuarioSeleccionado.rol] || []
    : [];

  return (
    <div className="modal">
      <div className="modal__content">
        <form onSubmit={handleSubmit}>
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="Título"
            required
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="Abierto">Abierto</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Cerrado">Cerrado</option>
          </select>

          <select name="prioridad" value={form.prioridad} onChange={handleChange}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>

          <select
            name="asignadoA"
            value={form.asignadoA}
            onChange={handleChange}
            required
          >
            <option value="">-- Asignar a --</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.email}>
                {u.email} ({u.rol})
              </option>
            ))}
          </select>


          <div className="etiquetas">
            <label>Etiquetas:</label>
            {etiquetasPermitidas.map((et) => (
              <div key={et}>
                <input
                  type="checkbox"
                  name="etiquetas"
                  value={et}
                  checked={form.etiquetas.includes(et)}
                  onChange={handleCheckbox}
                />
                <span>{et}</span>
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
