import { useState, useMemo } from "react"
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
import { useGoogleCalendar } from "../hooks/useGoogleCalendar"

function Task() {
  const [tasks, setTasks] = usePersistedTasks(TASKS)
  const { createEvent } = useGoogleCalendar()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")
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
    customToast.toast.error(`"${taskToDelete.title}" excluída`, {
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
    if (newTask.dueDate) createEvent(newTask)
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
          (priorityFilter === "all" || t.priority === priorityFilter) &&
          (periodFilter === "all" || t.time === periodFilter)
      ),
    [tasks, search, statusFilter, priorityFilter, periodFilter]
  )

  const morningTasks = filtered.filter((t) => t.time === "morning")
  const afternoonTasks = filtered.filter((t) => t.time === "afternoon")
  const eveningTasks = filtered.filter((t) => t.time === "evening")

  return (
    <div className="min-h-screen w-full space-y-4 px-4 py-4 dark:bg-gray-900 md:space-y-6 md:px-8 md:py-8">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="mb-1 block text-xs font-medium text-[#00ADB5] dark:text-[#00bfae]">
            Organize seu dia e alcance seus objetivos!
          </span>
          <h2 className="text-lg font-semibold dark:text-white md:text-xl">
            Inicio do dia,{" "}
            {new Date().toLocaleDateString("pt-BR", { weekday: "long" })}!
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="tertiary" onClick={() => setShowClearModal(true)}>
            <span className="hidden sm:inline">Limpar tarefas</span>
            <TrashIcon className="h-4 w-4" />
          </Button>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Nova tarefa</span>
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
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />

      <h2 className="text-lg font-semibold dark:text-white md:text-xl">
        Minhas Tarefas
      </h2>
      <div className="mt-2 w-full rounded-xl bg-white p-4 dark:bg-gray-800 md:mt-4 md:p-6">
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
