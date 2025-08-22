/* Aqui investigando que podia usar en react para el dashboard encontre Recharts,
 ya tiene muchas cosas establecidad e intuitivas de usar, me parecio una forma 
 senclla de pintar los datos ya que no habia en mi experiencia realizado un dashboard */

 /* En mi anterior trabajo y para nuestro cliente Movistar se
  realizo tambien un administrador para cargar la informacion de promociones  y al tener
  componentes tan grandes con la parte visual y logica inntegrada era mucho mas tardado cualquier modificacion UX que se realizaba
  Por eso distribui todo en diferentes componentes para que los cambios sean mas faciles, tanto de la parte de css como de html de la pagina*/

import  { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ticketsApi } from "../api/apiTickets"; 
import "../styles/dashboard.scss";

const COLORS = ["#FF8042", "#0088FE", "#00C49F"]; 

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    ticketsApi
      .getAll()
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando tickets...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const ticketsPorEstado = tickets.reduce((acc, t) => {
    acc[t.estado] = (acc[t.estado] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(ticketsPorEstado).map((estado) => ({
    name: estado,
    value: ticketsPorEstado[estado],
  }));

  return (
    <div className="dashboard">
      <h2>📊 Resumen de Tickets</h2>
      <div className="dashboard__stats">
        <div className="card">
          <h3>Total</h3>
          <p>{tickets.length}</p>
        </div>
        <div className="card">
          <h3>Abiertos</h3>
          <p>{ticketsPorEstado["Abierto"] || 0}</p>
        </div>
        <div className="card">
          <h3>Cerrados</h3>
          <p>{ticketsPorEstado["Cerrado"] || 0}</p>
        </div>
      </div>

      <div className="dashboard__chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
