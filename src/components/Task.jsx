import Button from "./Button"
import TrashIcon from "../assets/icons/trash.svg?react"
import AddIconn from "../assets/icons/add.svg?react"

function Task() {
  return (
    <div className="flex w-full gap-9 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold">Dashboard</span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <Button variant="secondary">
          <TrashIcon className="h-4 w-4" />
          Limpar Tarefas
        </Button>
        <Button variant="primary">
          <AddIconn className="h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </div>
    </div>
  )
}

export default Task
