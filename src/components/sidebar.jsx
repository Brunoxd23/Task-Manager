import HomeIcon from "../assets/icons/home.svg?react"
import TaskIcon from "../assets/icons/tasks.svg?react"

const NAV = [
  { id: "home", label: "Início", Icon: HomeIcon },
  { id: "tasks", label: "Minhas tarefas", Icon: TaskIcon },
]

const Sidebar = ({ page, setPage, isOpen, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white shadow-lg transition-transform duration-300 dark:bg-gray-800 md:sticky md:top-0 md:h-screen md:w-52 md:translate-x-0 md:shadow-sm ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Logo */}
      <div className="flex h-[68px] flex-col justify-center border-b border-gray-100 px-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#00ADB5]">
            <TaskIcon className="h-4 w-4 text-white" />
          </div>
          <span className="truncate text-base font-bold text-gray-800 dark:text-white">
            Task Manager
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
          Organize seu dia com foco
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Menu
        </p>
        {NAV.map(({ id, label, Icon }) => {
          const active = page === id
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-[#00ADB5] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:bg-gray-700"
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${
                  active ? "text-white" : "text-gray-400"
                }`}
              />
              {label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-700">
        <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500">
          Task Manager
          <br />
          <span className="text-[10px]">v1.0.0 · Feito com foco 🎯</span>
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
