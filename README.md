# Gestion-de-tickets
 Simulador un dashboard para gestión de tickets

## Instalación y ejecución

1. Clona el repositorio:
  - git clone https://github.com/Angelik4/Gestion-de-tickets.git
  - cd Gestion-de-tickets

2. Instala dependencias:
  - npm install

3. Arranca el backend simulado y el Frontend
  - npm run start:dev
    Esto levanta la API en http://localhost:8081

### Vista en funcionamiento de la aplicacion

<img src="../Gestion-de-tickets/images/interface-page.png"  width="600"style="margin-right: 10px;" />
<img src="../Gestion-de-tickets/images/filtros.png" width="auto" style="margin-left: 10px;" />
<div style="text-align:center;">
   <img src="../Gestion-de-tickets/images/new-tickets.png" width="400" style="margin-left: 10px;" />
  <img src="../Gestion-de-tickets/images/details.png" width="400" style="margin-left: 10px;" />
</div>
<div  style="text-align:center;">
 <img src="../Gestion-de-tickets/images/modal-deleted.png" width="400" style="margin-left: 10px;" />
  <img src="../Gestion-de-tickets/images/modal-edit.png" width="400" style="margin-left: 10px;" />
</div>


### Decisiones técnicas tomadas

- **Backend simulado con `server.js`**: Use `json-server` para simular una API REST sin montar un backend real, lo que agiliza el desarrollo y en el futuro se puede simplemente remplazar.
- **fetch con errores simulados (`fetchWithErrors`) y retry**: Implemente lógica para simular timeouts, errores HTTP y pérdida de conexión, y reintentar las peticiones para mejorar la experiencia.
- **Persistencia con `localStorage`**: Tras obtener datos correctamente, los guarde en el  cache local. En caso de fallo, se recurre a ese cache para que la pagina siga funcionando aun sin conexion.
- **Visualización con Recharts**: El `Dashboard` que se usa ya que es intuitivo que componentes listos para ser usados. 
- **Arquitectura modular**: La Api la centralice y tambien se hizo la implementacion de los componentes de manera modular para facilitar cambios futuros, asi como facilitar la lectura. 

## Tiempo estimado invertido

| Sección                              | Tiempo estimado |
|-------------------------------------|------------------|
| Configuración del entorno (Vite + JSON Server) | 2 h |
| Organizacion de componentes y validaciones básicas  | 4 h |
| Manejo de errores y retry                 | 3 h |
| Dashboard con el grafico usando Recharts   | 3 h |
| Estilos responsivos y mobile-first       | 2 h |
| Documentación y pruebas                  | 2 h |
| **Total estimado**                        | **16 hrs** |

## Mejoras futuras

- **Autenticación y control de roles** Aunque estan los usuarios en la base de datos no se implemento un login y tambien autenticacion podria ser con JWT/Security que lo maneje en algun ,momento con Java usando los token para que fuera mas seguro.
- **Paginación** Dado que no hay gran cantidad de datos no lo implemente, pero si deberia aplicarse una cierta cantidad de datos por vista. 
- **Notificaciones**  Para nuevos tickets o cambios que se generen deberia enviar notificacion a la persona asignada.
- **Exportar datos** Al ser un Dashboard deberia dejar descargar datos.
- **Migracion a backend real** Tener una base de datos real y poder conectar a un back real.

### API Error Handling Documentation

## Manejo de errores en la aplicación
En el administrador de tickets implemente un **(`fetchWithErrors`)** que sirvio para encapsular las diferentes llamadas a la Api y controla los errores que se solicitaron como:

- **Errores HTTP** (`500`, `429`).
- **Errores de conexión** (pérdida de red).
- **Timeouts configurables**.

Mostrando mensajes claros que especifican cual fue el error que ocurrio. 

---

### Estrategias de retry
Implemente un retry para la carga de tickets y creacion de nuevos tickets

1. Reintentar hasta **3 veces** en caso de errores temporales (`429`, conexión perdida, timeout).  
2. Incrementar el tiempo de espera entre intentos (**1s → 2s → 4s**).  
3. Cancelar si tras 3 intentos el error persiste, mostrando notificación al usuario.  

Esto hace que en el back no se generen como bucles y errores

---

### Tipos de errores y manejo aplicado
- **Errores de red**
  - Los errores los manejo con la respuesta en try/catch 

- **Errores HTTP**
  - Se valida `response.ok`.
  - Manejo específico:
    - `404`: recurso no encontrado.
    - `429`: demasiadas solicitudes y reintenta automaticamente.
    - `500`: error en el servidor, ya que hay un problema interno. 

- **Timeouts**
  - Aqui la peticion la cancela y envia un mensaje a la persona.

---

### Experiencia previa con problemas similares
En proyectos anteriores enfrenté escenarios parecidos:

- **Portal de ofertas (Movistar)**
- En ocaciones se presentaban fallas en la Api entonces se manejo la persistencia de datos. 

- **Plataforma de reportes internos:**  
  Siempre se enviaban mensajes muy tecnicos y a veces no entendibles para el cliente final en la parte de errores, se genero una validacion para mostrar datos y avisos para intuitivos a los clientes en caso de falla en el sistema. 
 
**“Siempre van a existir errores y es importante revisar como darle manejo a cada caso, ya que todos los errores no vienen del mismo origen"**


