import "../styles/filters.scss"
export default function FiltersTickets({ filters, setFilters }) {
    return (
        <div className="filters">
            <select
                value={filters.estado}
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, estado: e.target.value }))
                }
            >
                <option value="">Todos</option>
                <option value="abierto">Abierto</option>
                <option value="en progreso">En Progreso</option>
                <option value="cerrado">Cerrado</option>
            </select>

            <select
                value={filters.ordenFecha}
                onChange={(e) => setFilters({ ...filters, ordenFecha: e.target.value })}
            >
                <option value="desc">Más recientes</option>
                <option value="asc">Más antiguos</option>
            </select>

            <input
                type="text"
                placeholder="Buscar por título..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
        </div>
    );
}
