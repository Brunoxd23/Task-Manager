import Button from "./Button"
import TrashIcon from "../assets/icons/trash.svg?react"
import AddIconn from "../assets/icons/add.svg?react"

function Task() {
  return (
    <div className="flex w-full gap-9 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Dashboard
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <Button variant="secondary">
          Limpar Tarefa
          <TrashIcon />
        </Button>
        <Button variant="primary">
          Adicionar Tarefa
          <AddIconn />
        </Button>
      </div>
    </div>
  )
}

export default Task
