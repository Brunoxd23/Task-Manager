import { useState, useEffect } from "react"
import SunIcon from "../assets/icons/sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"

const TopBar = ({ isDark, toggleDark }) => {
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
    <div className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col">
        <span className="text-xs capitalize text-gray-400 dark:text-gray-500">
          {dateFmt}
        </span>
        <span className="font-mono text-lg font-semibold tracking-widest text-[#00ADB5]">
          {timeFmt}
        </span>
      </div>

      <button
        onClick={toggleDark}
        title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-[#00ADB5] hover:text-[#00ADB5] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-[#00ADB5] dark:hover:text-[#00ADB5]"
      >
        {isDark ? (
          <>
            <SunIcon className="h-4 w-4" />
            <span>Modo claro</span>
          </>
        ) : (
          <>
            <MoonIcon className="h-4 w-4" />
            <span>Modo escuro</span>
          </>
        )}
      </button>
    </div>
  )
}

export default TopBar
