import { useEffect } from "react"
import { getToken, onMessage } from "firebase/messaging"
import { getFirebaseMessaging } from "../firebase"
import * as customToast from "../components/CustomToast"

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY

export function usePushNotifications() {
  const requestPermission = async () => {
    const messaging = getFirebaseMessaging()
    if (!messaging || !("Notification" in window)) return

    try {
      const permission = await Notification.requestPermission()
      if (permission !== "granted") return

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      )

      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      })

      // Em produção: envie este token para seu backend para disparar notificações
      console.info("FCM Token registrado:", token)
      customToast.toast.success("Notificações ativadas! 🔔")
    } catch (err) {
      console.warn("Push notification setup failed:", err)
    }
  }

  useEffect(() => {
    const messaging = getFirebaseMessaging()
    if (!messaging) return

    const unsubscribe = onMessage(messaging, (payload) => {
      const title = payload.notification?.title ?? "Task Manager"
      const body = payload.notification?.body ?? ""
      customToast.toast.info(`${title}${body ? `: ${body}` : ""}`)
    })

    return unsubscribe
  }, [])

  return { requestPermission }
}
