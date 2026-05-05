import { useState } from "react"

const AddTaskModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("morning")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      id: Date.now(),
      title,
      description,
      time,
      status: "not_started",
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-2 text-lg font-semibold">Adicionar Nova Tarefa</h2>
        <input
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="mb-2 w-full rounded border px-3 py-2"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="evening">Noite</option>
        </select>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded bg-[#00ADB5] px-4 py-2 text-white hover:bg-[#009fa6]"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskModal
