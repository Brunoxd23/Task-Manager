import Button from "./Button"
import TrashIcon from "../assets/icons/trash.svg?react"
import AddIcon from "../assets/icons/add.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import CloudIcon from "../assets/icons/cloud-sun.svg?react"
import TasksSeparator from "./TasksSeparator"
import TASKS from "../constants/tasks"
import TasksItem from "./TasksItem"
import { useState } from "react"

function Task() {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks.filter((task) => task.time === "evening")
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <TrashIcon className="h-4 w-4" />
            Limpar tarefas
          </Button>
          <Button variant="primary">
            <span className="flex items-center gap-1">
              <AddIcon className="h-4 w-4" />
              Nova tarefa
            </span>
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full rounded-lg bg-white p-6">
        <div className="flex flex-col gap-2">
          {/* Manhã */}
          <div className="space-y-3">
            <TasksSeparator title="Manhã" Icon={SunIcon} />
            {/* Tarefas Manhã */}
            {morningTasks.map((task) => (
              <TasksItem key={task.id} Task={task} />
            ))}
          </div>
          <div className="my-4 space-y-3">
            {/* Tarde */}
            <TasksSeparator title="Tarde" Icon={CloudIcon} />
            {afternoonTasks.map((task) => (
              <TasksItem key={task.id} Task={task} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {/* Noite */}
          <TasksSeparator title="Noite" Icon={MoonIcon} />
          {eveningTasks.map((task) => (
            <TasksItem key={task.id} Task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
