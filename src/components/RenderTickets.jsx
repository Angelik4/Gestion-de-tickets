import { useEffect, useState, useMemo } from "react";
import { ticketsApi } from "../api/apiTickets";
import { usersApi} from "../api/apiUsers";
import FormTickets from "./FormTickets";
import DetailsTickets from "./DetailsTickets";
import FiltersTickets from "./FiltersTickets";
import TicketsTable from "./TicketsTable";
import Modal from "./Modal";

export default function RenderTickets() {
  const [tickets, setTickets] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const [filters, setFilters] = useState({
    estado: "",
    ordenFecha: "desc",
    search: "",
  });

  useEffect(() => {
    loadTickets();
    loadUsuarios();
  }, []);

  const loadTickets = () => {
    setLoading(true);
    ticketsApi.getAll().then(setTickets).finally(() => setLoading(false));
  };
  const loadUsuarios = () => {
    usersApi.getAll()
      .then(setUsuarios)
      .catch((err) => console.error("Error cargando usuarios:", err));
  };

  const confirmDelete = async () => {
    try {
      if (!deleting?.id) {
        console.error(" No hay id para eliminar", deleting);
        return;
      }

      await ticketsApi.delete(deleting.id);

      setTickets((prev) => prev.filter((t) => t.id !== deleting.id));

      setDeleting(null);
    } catch (err) {
      console.error("Error eliminando ticket:", err);
    }
  };

  const normalize = (s) =>
    (s ?? "")
      .toString()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const getDate = (t) =>
    new Date(t.fechaCreacion ?? t.fecha ?? t.createdAt ?? 0);

  const filteredTickets = useMemo(() => {
    let list = tickets;

    if (filters.estado) {
      const target = normalize(filters.estado);
      list = list.filter((t) => normalize(t.estado) === target);
    }

    if (filters.search) {
      const q = normalize(filters.search);
      list = list.filter((t) => normalize(t.titulo).includes(q));
    }

    const sorted = [...list].sort((a, b) => {
      const da = getDate(a).getTime();
      const db = getDate(b).getTime();
      return filters.ordenFecha === "asc" ? da - db : db - da;
    });

    return sorted;
  }, [tickets, filters]);


  if (loading) return <p>Cargando...</p>;

  return (
    <div className="tickets">
      <h2>🎫 Lista de Tickets</h2>
      <button onClick={() => setEditing({})} className="btn-NewTicket">
        + Nuevo Ticket
      </button>

      <FiltersTickets filters={filters} setFilters={setFilters} />

      <TicketsTable
        tickets={filteredTickets}
        onSelect={setSelected}
        onEdit={setEditing}
        onDelete={setDeleting}
      />

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Detalles del Ticket"
      >
        {selected && (
          <DetailsTickets
            ticket={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Editar Ticket" : "Nuevo Ticket"}
      >
        {editing && (
          <FormTickets
            ticket={editing}
            onClose={() => {
              setEditing(null);
              loadTickets();
            }}
          />
        )}
      </Modal>
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Eliminar Ticket"
      >
        <p>¿Seguro que quieres eliminar <b>{deleting?.titulo}</b>?</p>
        <div className="modal-actions">
          <button onClick={confirmDelete} className="confirm">Sí, eliminar</button>
          <button onClick={() => setDeleting(null)} className="cancel">Cancelar</button>
        </div>
      </Modal>

    </div>
  );
}
export { RenderTickets };