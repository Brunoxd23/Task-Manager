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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster />

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        page={page}
        setPage={(p) => {
          setPage(p)
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          isDark={isDark}
          toggleDark={toggleDark}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />
        {page === "home" ? <Home setPage={setPage} /> : <Task />}
      </div>
    </div>
  )
}

export default App
