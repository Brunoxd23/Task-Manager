import CheckIcon from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
const TasksItem = ({ Task }) => {
  // Cores e estilos inspirados no print
  const getStatusClass = () => {
    if (Task.status === "done") {
      return "bg-[#e6f7f8] text-[#2d3a3a]"
    }
    if (Task.status === "in_progress") {
      return "bg-[#fff7e6] text-[#a67c00]"
    }
    if (Task.status === "not_started") {
      return "bg-[#f5f5f5] text-[#888]"
    }
    return ""
  }

  const getCheckStyle = () => {
    if (Task.status === "done") {
      return "border-2 border-[#00bfae] bg-[#00bfae] text-white"
    }
    if (Task.status === "in_progress") {
      return "border-2 border-[#ffb300] bg-[#fff7e6] text-[#ffb300]"
    }
    return "border-2 border-[#d1d5db] bg-[#f5f5f5] text-[#d1d5db]"
  }

  return (
    <div
      className={`mb-2 flex items-center justify-between gap-3 rounded-xl px-5 py-4 text-base font-medium transition-all duration-300 ${getStatusClass()}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${getCheckStyle()}`}
        >
          {Task.status === "done" && <CheckIcon className="h-5 w-5" />}
          {Task.status === "in_progress" && (
            <LoaderIcon className="h-5 w-5 animate-spin" />
          )}
        </span>
        {Task.title}
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-red-100"
          title="Excluir"
        >
          <TrashIcon className="h-5 w-5 text-red-500" />
        </button>
        <a
          href="#"
          className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-blue-100"
          title="Detalhes"
        >
          <DetailsIcon className="h-5 w-5 text-blue-500" />
        </a>
      </div>
    </div>
  )
}

export default TasksItem
