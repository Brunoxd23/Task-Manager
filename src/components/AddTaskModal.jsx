import { useState } from "react"

const AddTaskModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("morning")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      id: Date.now(),
      title,
      description,
      time,
      priority,
      dueDate,
      status: "not_started",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40 sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-t-2xl bg-white p-5 shadow-lg dark:bg-gray-800 sm:rounded-2xl sm:p-6"
      >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-white">
            Adicionar Nova Tarefa
          </h2>
          {/* drag handle visual no mobile */}
          <div className="h-1 w-10 rounded-full bg-gray-200 dark:bg-gray-600 sm:hidden" />
        </div>
        <input
          className="w-full rounded-xl border px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded-xl border px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Período
            </label>
            <select
              className="w-full rounded-xl border px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="morning">Manhã</option>
              <option value="afternoon">Tarde</option>
              <option value="evening">Noite</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
              Prioridade
            </label>
            <select
              className="w-full rounded-xl border px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
            Data de vencimento (opcional)
          </label>
          <input
            type="date"
            className="w-full rounded-xl border px-3 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] flex-1 rounded-xl bg-gray-100 text-sm font-medium hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="min-h-[44px] flex-1 rounded-xl bg-[#00ADB5] text-sm font-semibold text-white hover:bg-[#009fa6] focus:bg-[#009fa6]"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskModal
