import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./components/sidebar"
import Task from "./components/Task"
import Home from "./components/Home"
import TopBar from "./components/TopBar"
import LoginPage from "./components/auth/LoginPage"
import RegisterPage from "./components/auth/RegisterPage"
import PrivateRoute from "./components/PrivateRoute"
import { Toaster } from "sonner"
import { useDarkMode } from "./hooks/useDarkMode"
import { AuthProvider } from "./contexts/AuthContext"

function AppLayout({ isDark, toggleDark }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          isDark={isDark}
          toggleDark={toggleDark}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/minhas-tarefas"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  const [isDark, toggleDark] = useDarkMode()

  return (
    <AuthProvider>
      <Toaster
        position="bottom-right"
        richColors
        theme={isDark ? "dark" : "light"}
        toastOptions={{
          classNames: {
            toast:
              "dark:bg-gray-800 dark:text-white dark:border-gray-700 font-sans",
            title: "dark:text-white",
            description: "dark:text-gray-300",
            actionButton:
              "!bg-[#00ADB5] !text-white hover:!bg-[#009aa1] !font-semibold",
            cancelButton: "dark:bg-gray-700 dark:text-gray-300",
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route
          path="/*"
          element={<AppLayout isDark={isDark} toggleDark={toggleDark} />}
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
