import { useState, useEffect } from "react"

export function usePersistedTasks(initialTasks) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks")
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return [tasks, setTasks]
}
