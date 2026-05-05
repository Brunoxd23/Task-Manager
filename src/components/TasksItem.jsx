import CheckIcon from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"

const priorityDot = {
  high: "bg-red-500",
  medium: "bg-yellow-400",
  low: "bg-green-400",
}

const TasksItem = ({
  task,
  handleCheckboxClick,
  handleCheckboxDelete,
  onEdit,
}) => {
  const getStatusClass = () => {
    if (task.status === "done") {
      return "bg-[#e6f7f8] text-[#2d3a3a] dark:bg-teal-900 dark:text-teal-100"
    }
    if (task.status === "in_progress") {
      return "bg-[#fff7e6] text-[#a67c00] dark:bg-yellow-900 dark:text-yellow-200"
    }
    return "bg-[#f5f5f5] text-[#888] dark:bg-gray-700 dark:text-gray-300"
  }

  const getCheckStyle = () => {
    if (task.status === "done") {
      return "border-2 border-[#00bfae] bg-[#00bfae] text-white"
    }
    if (task.status === "in_progress") {
      return "border-2 border-[#ffb300] bg-[#fff7e6] text-[#ffb300]"
    }
    return "border-2 border-[#d1d5db] bg-[#f5f5f5] text-[#d1d5db]"
  }

  const isOverdue =
    task.dueDate &&
    task.status !== "done" &&
    new Date(task.dueDate + "T00:00:00") < new Date(new Date().toDateString())

  return (
    <div
      className={`mb-2 flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 md:px-5 md:py-4 md:text-base ${getStatusClass()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-md transition-all duration-200 md:h-7 md:w-7 ${getCheckStyle()}`}
        >
          <input
            type="checkbox"
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon className="h-5 w-5" />}
          {task.status === "in_progress" && (
            <LoaderIcon className="h-5 w-5 animate-spin" />
          )}
        </label>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            {task.priority && (
              <span
                className={`h-2 w-2 rounded-full ${priorityDot[task.priority] || "bg-gray-400"}`}
                title={
                  task.priority === "high"
                    ? "Alta"
                    : task.priority === "medium"
                      ? "Média"
                      : "Baixa"
                }
              />
            )}
            <span
              className={
                task.status === "done" ? "line-through opacity-60" : ""
              }
            >
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isOverdue && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                Atrasada
              </span>
            )}
            {task.dueDate && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {new Date(task.dueDate + "T00:00:00").toLocaleDateString(
                  "pt-BR"
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors hover:bg-red-100 focus:bg-red-100 dark:hover:bg-red-900/30"
          title="Excluir"
          onClick={() => handleCheckboxDelete(task.id)}
        >
          <TrashIcon className="h-5 w-5 text-red-500" />
        </button>
        <button
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors hover:bg-blue-100 focus:bg-blue-100 dark:hover:bg-blue-900/30"
          title="Editar"
          onClick={() => onEdit(task)}
        >
          <DetailsIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>
    </div>
  )
}

export default TasksItem
