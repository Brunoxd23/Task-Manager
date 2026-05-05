const STATUS_OPTIONS = [
  { value: "all", label: "Todas" },
  { value: "not_started", label: "Pendentes" },
  { value: "in_progress", label: "Em andamento" },
  { value: "done", label: "Concluídas" },
]

const PRIORITY_OPTIONS = [
  { value: "all", label: "Todas", dot: null },
  { value: "high", label: "Alta", dot: "bg-red-500" },
  { value: "medium", label: "Média", dot: "bg-yellow-400" },
  { value: "low", label: "Baixa", dot: "bg-green-400" },
]

const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  const hasActiveFilters =
    search !== "" || statusFilter !== "all" || priorityFilter !== "all"

  const clearAll = () => {
    setSearch("")
    setStatusFilter("all")
    setPriorityFilter("all")
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm dark:bg-gray-800">
      {/* Linha 1: busca + limpar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-600"
            >
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M6 6l8 8M14 6l-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500 dark:border-gray-600 dark:text-gray-400 dark:hover:border-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 6l8 8M14 6l-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Limpar filtros
          </button>
        )}
      </div>

      {/* Linha 2: Status + Prioridade */}
      <div className="flex flex-wrap items-start gap-4">
        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Status
          </span>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  statusFilter === value
                    ? "bg-[#00ADB5] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="hidden self-stretch border-l border-gray-100 dark:border-gray-700 sm:block" />

        {/* Prioridade */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Prioridade
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRIORITY_OPTIONS.map(({ value, label, dot }) => (
              <button
                key={value}
                onClick={() => setPriorityFilter(value)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  priorityFilter === value
                    ? "bg-[#00ADB5] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {dot && (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      priorityFilter === value ? "bg-white/80" : dot
                    }`}
                  />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
