import { useState, useMemo } from "react"
import TrashIcon from "../assets/icons/trash.svg?react"

const statusLabel = {
  not_started: {
    text: "Pendente",
    cls: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300",
  },
  in_progress: {
    text: "Em andamento",
    cls: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  },
  done: {
    text: "Concluída",
    cls: "bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-200",
  },
}

const periodLabel = { morning: "Manhã", afternoon: "Tarde", evening: "Noite" }
const priorityDot = {
  high: "bg-red-500",
  medium: "bg-yellow-400",
  low: "bg-green-400",
}

const ClearTasksModal = ({ tasks, onConfirm, onClose }) => {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selected, setSelected] = useState(
    () => new Set(tasks.map((t) => t.id))
  )
  const [step, setStep] = useState("select") // "select" | "confirm"

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (statusFilter === "all" || t.status === statusFilter)
      ),
    [tasks, search, statusFilter]
  )

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((t) => selected.has(t.id))

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (allFilteredSelected) {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((t) => next.delete(t.id))
        return next
      })
    } else {
      setSelected((prev) => {
        const next = new Set(prev)
        filtered.forEach((t) => next.add(t.id))
        return next
      })
    }
  }

  const selectedTasks = tasks.filter((t) => selected.has(t.id))

  if (step === "confirm") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <TrashIcon className="h-7 w-7 text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Confirmar exclusão
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Você está prestes a excluir{" "}
            <span className="font-semibold text-red-500">{selected.size}</span>{" "}
            {selected.size === 1 ? "tarefa" : "tarefas"}. Essa ação não pode ser
            desfeita.
          </p>
          <ul className="mt-4 max-h-40 space-y-1 overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700">
            {selectedTasks.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"
              >
                <span
                  className={`h-2 w-2 rounded-full ${priorityDot[t.priority] || "bg-gray-400"}`}
                />
                {t.title}
                <span className="ml-auto text-xs text-gray-400">
                  {periodLabel[t.time]}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep("select")}
              className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Voltar
            </button>
            <button
              onClick={() => onConfirm(selected)}
              className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Excluir {selected.size}{" "}
              {selected.size === 1 ? "tarefa" : "tarefas"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Limpar tarefas
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {selected.size} de {tasks.length} selecionadas
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-4 dark:border-gray-700">
          <input
            type="text"
            placeholder="Buscar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#00ADB5] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Todas" },
              { value: "not_started", label: "Pendentes" },
              { value: "in_progress", label: "Em andamento" },
              { value: "done", label: "Concluídas" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  statusFilter === value
                    ? "bg-[#00ADB5] text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Selecionar todos */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-3 dark:border-gray-700">
          <input
            type="checkbox"
            id="select-all"
            checked={allFilteredSelected}
            onChange={toggleAll}
            className="h-4 w-4 cursor-pointer accent-[#00ADB5]"
          />
          <label
            htmlFor="select-all"
            className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            {allFilteredSelected
              ? "Desmarcar todos"
              : "Selecionar todos visíveis"}
          </label>
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} {filtered.length === 1 ? "tarefa" : "tarefas"}
          </span>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">
              Nenhuma tarefa encontrada.
            </p>
          ) : (
            <ul className="space-y-2">
              {filtered.map((task) => {
                const s = statusLabel[task.status] || statusLabel.not_started
                return (
                  <li
                    key={task.id}
                    onClick={() => toggleOne(task.id)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                      selected.has(task.id)
                        ? "bg-red-50 dark:bg-red-900/30"
                        : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(task.id)}
                      onChange={() => toggleOne(task.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer accent-red-500"
                    />
                    <span
                      className={`h-2 w-2 flex-shrink-0 rounded-full ${priorityDot[task.priority] || "bg-gray-400"}`}
                    />
                    <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                      {task.title}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}
                    >
                      {s.text}
                    </span>
                    <span className="text-xs text-gray-400">
                      {periodLabel[task.time]}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            disabled={selected.size === 0}
            onClick={() => setStep("confirm")}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <TrashIcon className="h-4 w-4" />
            Excluir {selected.size > 0 ? `${selected.size} ` : ""}
            {selected.size === 1 ? "tarefa" : "tarefas"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClearTasksModal
