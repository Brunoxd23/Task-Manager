import Button from "./Button"
import TrashIcon from "../assets/icons/trash.svg?react"
import AddIcon from "../assets/icons/add.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import CloudIcon from "../assets/icons/cloud-sun.svg?react"

function Task() {
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
            <div className="flex items-center gap-2 border-b pb-2 text-gray-400">
              <SunIcon className="h-5 w-5" />
              <p className="text-sn text-[#9A9C9F]">Manhã</p>
            </div>
          </div>
          <div className="my-4 space-y-3">
            {/* Tarde */}
            <div className="flex items-center gap-2 border-b pb-2 text-gray-400">
              <CloudIcon className="h-5 w-5" />
              <p className="text-sn text-[#9A9C9F]">Tarde</p>
            </div>
          </div>
          <div className="space-y-3">
            {/* Noite */}
            <div className="flex items-center gap-2 border-b pb-2 text-gray-400">
              <MoonIcon className="h-5 w-5" />
              <p className="text-sn text-[#9A9C9F]">Noite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Task
