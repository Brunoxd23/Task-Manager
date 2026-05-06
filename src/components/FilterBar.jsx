import { useState, useRef, useEffect } from "react"

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

const PERIOD_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "morning", label: "Manhã" },
  { value: "afternoon", label: "Tarde" },
  { value: "evening", label: "Noite" },
]

const FilterSelect = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = options.find((o) => o.value === value) ?? options[0]
  const isActive = value !== "all"

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="relative flex flex-col gap-1" ref={ref}>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex min-w-[130px] items-center justify-between gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium transition-all ${
          isActive
            ? "border-[#00ADB5] bg-[#00ADB5]/10 text-[#00ADB5] dark:bg-[#00ADB5]/20 dark:text-[#00d4dc]"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-gray-500"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {selected.dot && (
            <span
              className={`h-2 w-2 flex-shrink-0 rounded-full ${selected.dot}`}
            />
          )}
          {selected.label}
        </span>
        <svg
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                opt.value === value
                  ? "bg-[#00ADB5]/10 font-medium text-[#00ADB5] dark:bg-[#00ADB5]/20 dark:text-[#00d4dc]"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {opt.dot && (
                <span
                  className={`h-2 w-2 flex-shrink-0 rounded-full ${opt.dot}`}
                />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const FilterBar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  periodFilter,
  setPeriodFilter,
}) => {
  const hasActiveFilters =
    search !== "" ||
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    periodFilter !== "all"

  const clearAll = () => {
    setSearch("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setPeriodFilter("all")
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm dark:bg-gray-800">
      {/* Busca */}
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

      {/* Filtros lado a lado */}
      <div className="flex flex-wrap items-end gap-3">
        <FilterSelect
          label="Status"
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={setStatusFilter}
        />
        <FilterSelect
          label="Prioridade"
          options={PRIORITY_OPTIONS}
          value={priorityFilter}
          onChange={setPriorityFilter}
        />
        <FilterSelect
          label="Período"
          options={PERIOD_OPTIONS}
          value={periodFilter}
          onChange={setPeriodFilter}
        />
      </div>
    </div>
  )
}

export default FilterBar
