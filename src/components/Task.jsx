import { useState, useMemo } from "react"
import { toast as sonnerToast } from "sonner"
import Button from "./Button"
import { TrashIcon, AddIcon, SunIcon, MoonIcon, CloudIcon } from "../assets"
import TasksSeparator from "./TasksSeparator"
import TASKS from "../constants/tasks"
import TasksItem from "./TasksItem"
import AddTaskModal from "./AddTaskModal"
import EditTaskModal from "./EditTaskModal"
import FilterBar from "./FilterBar"
import DaySummary from "./DaySummary"
import ClearTasksModal from "./ClearTasksModal"
import * as customToast from "./CustomToast"
import { usePersistedTasks } from "../hooks/usePersistedTasks"

function Task() {
  const [tasks, setTasks] = usePersistedTasks(TASKS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [showClearModal, setShowClearModal] = useState(false)

  const handleConfirmClear = (selectedIds) => {
    const count = selectedIds.size
    setTasks((prev) => prev.filter((t) => !selectedIds.has(t.id)))
    setShowClearModal(false)
    customToast.toast.success(
      `${count} ${count === 1 ? "tarefa excluída" : "tarefas excluídas"} com sucesso!`
    )
  }

  const handleCheckboxDelete = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    sonnerToast(`"${taskToDelete.title}" excluída`, {
      duration: 5000,
      action: {
        label: "Desfazer",
        onClick: () => {
          setTasks((prev) => [...prev, taskToDelete])
          customToast.toast.success("Tarefa restaurada!")
        },
      },
    })
  }

  const handleCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) return task
      if (task.status === "not_started") {
        customToast.toast.info("Tarefa em andamento!")
        return { ...task, status: "in_progress" }
      }
      if (task.status === "in_progress") {
        customToast.toast.success("Tarefa concluída!")
        return { ...task, status: "done" }
      }
      customToast.toast.warning("Tarefa reiniciada!")
      return { ...task, status: "not_started" }
    })
    setTasks(newTasks)
  }

  const handleClearTasks = () => {
    setTasks([])
    customToast.toast.success("Todas as tarefas foram limpas!")
  }

  const handleSaveTask = (newTask) => {
    setTasks([...tasks, newTask])
    setShowAddModal(false)
    customToast.toast.success("Tarefa adicionada com sucesso!")
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditTask(null)
    customToast.toast.success("Tarefa atualizada!")
  }

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (statusFilter === "all" || t.status === statusFilter) &&
          (priorityFilter === "all" || t.priority === priorityFilter)
      ),
    [tasks, search, statusFilter, priorityFilter]
  )

  const morningTasks = filtered.filter((t) => t.time === "morning")
  const afternoonTasks = filtered.filter((t) => t.time === "afternoon")
  const eveningTasks = filtered.filter((t) => t.time === "evening")

  return (
    <div className="min-h-screen w-full space-y-6 px-8 py-8 dark:bg-gray-900">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold dark:text-white">
            Minhas Tarefas
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setShowClearModal(true)}>
            Limpar tarefas
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <span className="flex items-center gap-1">
              Nova tarefa
              <AddIcon className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>

      <DaySummary tasks={tasks} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      <div className="mt-4 w-full rounded-lg bg-white p-6 dark:bg-gray-800">
        <div className="flex flex-col gap-2">
          <div className="space-y-3">
            <TasksSeparator title="Manhã" Icon={SunIcon} />
            {morningTasks.map((task) => (
              <TasksItem
                key={task.id}
                task={task}
                handleCheckboxClick={handleCheckboxClick}
                handleCheckboxDelete={handleCheckboxDelete}
                onEdit={setEditTask}
              />
            ))}
          </div>
          <div className="my-4 space-y-3">
            <TasksSeparator title="Tarde" Icon={CloudIcon} />
            {afternoonTasks.map((task) => (
              <TasksItem
                key={task.id}
                task={task}
                handleCheckboxClick={handleCheckboxClick}
                handleCheckboxDelete={handleCheckboxDelete}
                onEdit={setEditTask}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <TasksSeparator title="Noite" Icon={MoonIcon} />
          {eveningTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleCheckboxClick}
              handleCheckboxDelete={handleCheckboxDelete}
              onEdit={setEditTask}
            />
          ))}
        </div>
      </div>

      {showClearModal && tasks.length > 0 && (
        <ClearTasksModal
          tasks={tasks}
          onConfirm={handleConfirmClear}
          onClose={() => setShowClearModal(false)}
        />
      )}
      {showAddModal && (
        <AddTaskModal
          onSave={handleSaveTask}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onSave={handleUpdateTask}
          onClose={() => setEditTask(null)}
        />
      )}
    </div>
  )
}

export default Task
