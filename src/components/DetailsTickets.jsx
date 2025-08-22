
export default function DetailsTickets({ ticket}) {
  return (
    <div className="modal">
      <div className="modal__content">
        <p><b>ID:</b> {ticket.id}</p>
        <p><b>Título:</b> {ticket.titulo}</p>
        <p><b>Descripción:</b> {ticket.descripcion}</p>
        <p><b>Estado:</b> {ticket.estado}</p>
        <p><b>Prioridad:</b> {ticket.prioridad}</p>
        <p><b>Asignado a:</b> {ticket.asignadoA}</p>
        <p><b>Etiquetas:</b> {ticket.etiquetas?.join(", ")}</p>
      </div>
    </div>
  );
}
