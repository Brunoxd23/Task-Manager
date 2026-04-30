import SidebarButton from "./SidebarButton"
import HomeIcon from "../assets/icons/home.svg?react"
import TaskIcon from "../assets/icons/tasks.svg?react"

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          um Simples {""}
          <span className="text-[#00ADB5]">Organizador de Tarefa</span>.
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselect">
          <HomeIcon className="sidebar-icon" />
          <h1 className="mt-1">Início</h1>
        </SidebarButton>

        <SidebarButton variant="select">
          <TaskIcon className="sidebar-icon" />
          <h1 className="mt-1">Minhas tarefas</h1>
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
