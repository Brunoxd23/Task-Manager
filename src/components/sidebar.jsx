import HomeIcon from "../assets/icons/home.svg?react"
import TaskIcon from "../assets/icons/tasks.svg?react"

const NAV = [
  { id: "home", label: "Início", Icon: HomeIcon },
  { id: "tasks", label: "Minhas tarefas", Icon: TaskIcon },
]

const Sidebar = ({ page, setPage }) => {
  return (
    <div className="flex h-screen w-52 flex-col bg-white shadow-sm dark:bg-gray-800">
      {/* Logo */}
      <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00ADB5]">
            <TaskIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-gray-800 dark:text-white">
            Task Manager
          </span>
        </div>
        <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
          Organize seu dia com foco
        </p>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 p-3">
        <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Menu
        </p>
        {NAV.map(({ id, label, Icon }) => {
          const active = page === id
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-[#00ADB5] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <Icon
                className={`h-4 w-4 flex-shrink-0 ${
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
    </div>
  )
}

export default Sidebar
