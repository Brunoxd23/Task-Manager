import { NavLink, useNavigate } from "react-router-dom"
import HomeIcon from "../assets/icons/home.svg?react"
import TaskIcon from "../assets/icons/tasks.svg?react"
import { useAuth } from "../hooks/useAuth"
import { useGoogleCalendar } from "../hooks/useGoogleCalendar"
import { usePushNotifications } from "../hooks/usePushNotifications"

const NAV = [
  { to: "/inicio", label: "Início", Icon: HomeIcon },
  { to: "/minhas-tarefas", label: "Minhas tarefas", Icon: TaskIcon },
]

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, logout, requestCalendarAccess } = useAuth()
  const { hasCalendarAccess } = useGoogleCalendar()
  const { requestPermission } = usePushNotifications()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    onClose()
    navigate("/login")
  }

  const avatar =
    currentUser?.displayName?.[0]?.toUpperCase() ??
    currentUser?.email?.[0]?.toUpperCase() ??
    "U"

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
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#00ADB5] text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:focus:bg-gray-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}
                />
                {label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Integrações */}
        <p className="mb-1 mt-4 px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Integrações
        </p>

        {!hasCalendarAccess && (
          <button
            onClick={requestCalendarAccess}
            className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Google Calendar
          </button>
        )}

        {hasCalendarAccess && (
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-green-600 dark:text-green-400">
            <svg
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 16l2 2 4-4"
              />
            </svg>
            Calendar conectado
          </div>
        )}

        <button
          onClick={requestPermission}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        >
          <svg
            className="h-5 w-5 flex-shrink-0 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          Ativar notificações
        </button>
      </nav>

      {/* User + Logout */}
      <div className="border-t border-gray-100 px-3 py-3 dark:border-gray-700">
        {currentUser && (
          <div className="mb-2 flex items-center gap-2 rounded-xl px-2 py-1.5">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="avatar"
                referrerPolicy="no-referrer"
                className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#00ADB5] text-xs font-bold text-white">
                {avatar}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-gray-700 dark:text-gray-200">
                {currentUser.displayName ?? "Usuário"}
              </p>
              <p className="truncate text-[10px] text-gray-400">
                {currentUser.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sair da conta
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
