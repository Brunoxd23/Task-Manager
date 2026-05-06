import { useEffect, useRef } from "react"
import * as customToast from "../components/CustomToast"

const SW_PATH = "/firebase-messaging-sw.js"

async function getSwRegistration() {
  if (!("serviceWorker" in navigator)) return null
  try {
    return await navigator.serviceWorker.ready
  } catch {
    return null
  }
}

async function showSwNotification(title, body, tag) {
  const reg = await getSwRegistration()
  if (reg) {
    reg.showNotification(title, {
      body,
      icon: "/favicon.svg",
      badge: "/favicon.svg",
      tag: tag ?? "task-manager",
      renotify: true,
    })
  } else if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "/favicon.svg" })
  }
}

export function usePushNotifications() {
  const timersRef = useRef([])

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      customToast.toast.error("Seu navegador não suporta notificações")
      return false
    }
    try {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") {
        customToast.toast.error("Permissão de notificação negada")
        return false
      }
      await navigator.serviceWorker.register(SW_PATH)
      await showSwNotification(
        "Task Manager",
        "Notificações ativadas! Você receberá lembretes das suas tarefas. ✅",
        "permission-granted"
      )
      customToast.toast.success("Notificações ativadas! 🔔")
      return true
    } catch (err) {
      console.warn("Notification setup failed:", err)
      return false
    }
  }

  const notifyTask = async (task) => {
    if (Notification.permission !== "granted") return
    // Notificação imediata de confirmação
    await showSwNotification(
      "Tarefa criada!",
      `"${task.title}" foi adicionada${task.dueDate ? ` para ${new Date(task.dueDate + "T12:00").toLocaleDateString("pt-BR")}` : ""}.`,
      `task-created-${task.id}`
    )

    // Lembrete agendado no horário da tarefa (enquanto app aberto)
    if (!task.dueDate) return
    const timeMap = { morning: 9, afternoon: 14, evening: 20 }
    const hour = timeMap[task.time] ?? 9
    const due = new Date(
      `${task.dueDate}T${String(hour).padStart(2, "0")}:00:00`
    )
    const msUntilDue = due.getTime() - Date.now()
    if (msUntilDue <= 0) return

    const id = setTimeout(() => {
      showSwNotification(
        "⏰ Lembrete de tarefa!",
        `"${task.title}" está programada para agora.`,
        `task-reminder-${task.id}`
      )
    }, msUntilDue)
    timersRef.current.push(id)
  }

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach(clearTimeout)
  }, [])

  return { requestPermission, notifyTask }
}
