import { useState, useEffect } from "react"
import SunIcon from "../assets/icons/sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"

const TopBar = ({ isDark, toggleDark, onMenuClick }) => {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const dateFmt = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const timeFmt = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <div className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:px-8">
      <div className="flex items-center gap-3">
        {/* Hamburger — só mobile */}
        <button
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700 md:hidden"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex flex-col">
          <span className="hidden text-xs capitalize text-gray-400 dark:text-gray-500 sm:block">
            {dateFmt}
          </span>
          <span className="font-mono text-base font-semibold tracking-widest text-[#00ADB5] sm:text-lg">
            {timeFmt}
          </span>
        </div>
      </div>

      <button
        onClick={toggleDark}
        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
        className="flex min-h-[44px] items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:border-[#00ADB5] hover:text-[#00ADB5] focus:border-[#00ADB5] focus:text-[#00ADB5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-[#00ADB5] dark:hover:text-[#00ADB5] sm:px-4"
      >
        {isDark ? (
          <>
            <SunIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Modo claro</span>
          </>
        ) : (
          <>
            <MoonIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Modo escuro</span>
          </>
        )}
      </button>
    </div>
  )
}

export default TopBar
