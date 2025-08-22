/* Decidi crear el siguiente archivo ya que al usar la libreria json-server me estaba trayendo 
los id de forma alfanumeriaca, esto me permite poder correguir ese funcionamiento 
sin que se rompa en el envio y manejo de los datos, ya que al no ser datos esperados hacia que mi 
CRUD no funcionara de forma adecuada */

/* Tambien ya que se maneja el levantamiento del servidor desde aqui debi modificar mi package.json 
para correr el servidor y tambien levantar la base de datos simulada con un solo comando */

import path from "path";
import { fileURLToPath } from "url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/tickets", (req, res, next) => {
  console.log("👉 Nuevo ticket recibido:", req.body);

  const db = router.db; 
  const tickets = db.get("tickets").value() || [];
  console.log("👉 Tickets actuales:", tickets);

  const maxId = tickets.reduce((max, t) => {
    const n = parseInt(t.id, 10);
    return Number.isFinite(n) ? Math.max(max, n) : max;
  }, 0);

  req.body.id = maxId + 1;
  console.log("👉 Nuevo id asignado:", req.body.id);

  const now = new Date().toISOString();
  req.body.fechaCreacion = now;
  req.body.fechaActualizacion = now;

  next();

  setTimeout(() => {
    const updatedTickets = db.get("tickets").value() || [];
  }, 200);
});


server.put("/tickets/:id", (req, res, next) => {
  req.body.fechaActualizacion = new Date().toISOString();
  next();
});

server.use(router);
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server corriendo en http://localhost:${PORT}`);
});
