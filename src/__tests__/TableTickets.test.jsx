import { render, screen } from "@testing-library/react";
import TicketsTable from "../components/TicketsTable";

const noop = () => {};

test("muestra 'No hay tickets' cuando la lista está vacía", () => {
  render(<TicketsTable tickets={[]} onSelect={noop} onEdit={noop} onDelete={noop} />);
  expect(screen.getByText(/No hay tickets/i)).toBeInTheDocument();
});

test("renderiza un ticket con sus datos", () => {
  const mock = [{
    id: 1,
    titulo: "Bug en login",
    estado: "Abierto",
    prioridad: "Alta",
    fechaCreacion: "2024-08-10T10:30:00Z",
  }];
  render(<TicketsTable tickets={mock} onSelect={noop} onEdit={noop} onDelete={noop} />);
  expect(screen.getByText(/Bug en login/i)).toBeInTheDocument();
  expect(screen.getByText(/Abierto/i)).toBeInTheDocument();
  expect(screen.getByText(/Alta/i)).toBeInTheDocument();
});