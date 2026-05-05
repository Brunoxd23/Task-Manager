import { useState } from "react"
import Sidebar from "./components/sidebar"
import Task from "./components/Task"
import Home from "./components/Home"
import TopBar from "./components/TopBar"
import { Toaster } from "sonner"
import { useDarkMode } from "./hooks/useDarkMode"

function App() {
  const [isDark, toggleDark] = useDarkMode()
  const [page, setPage] = useState("home")

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <Sidebar page={page} setPage={setPage} />
      <div className="flex flex-1 flex-col">
        <TopBar isDark={isDark} toggleDark={toggleDark} />
        {page === "home" ? <Home setPage={setPage} /> : <Task />}
      </div>
    </div>
  )
}

export default App
