import "../styles/ticketsTable.scss";
export default function TicketsTable({ tickets, onSelect, onEdit, onDelete }) {
  return (
    <table className="tickets__table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Estado</th>
          <th>Prioridad</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length === 0 ? (
          <tr>
            <td colSpan="6">No hay tickets</td>
          </tr>
        ) : (
          tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td data-label="ID">{ticket.id}</td>
              <td data-label="Título">{ticket.titulo}</td>
              <td data-label="Estado">{ticket.estado}</td>
              <td data-label="Prioridad">{ticket.prioridad}</td>
              <td data-label="Fecha">
                {ticket.fechaCreacion
                  ? new Date(ticket.fechaCreacion).toLocaleString()
                  : "Sin fecha"}
              </td>
              <td data-label="Acciones">
                <button onClick={() => onSelect(ticket)}>👁️</button>
                <button onClick={() => onEdit(ticket)}>✏️</button>
                <button onClick={() => onDelete(ticket)}>🗑️</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}