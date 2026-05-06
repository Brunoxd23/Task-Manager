import { useAuth } from "./useAuth"
import * as customToast from "../components/CustomToast"

const CALENDAR_API = "https://www.googleapis.com/calendar/v3"

const TIME_MAP = {
  morning: { start: "09:00", end: "09:30" },
  afternoon: { start: "14:00", end: "14:30" },
  evening: { start: "20:00", end: "20:30" },
}

export function useGoogleCalendar() {
  const { calendarToken, requestCalendarAccess } = useAuth()

  const ensureToken = async () => {
    if (calendarToken) return calendarToken
    return requestCalendarAccess()
  }

  const createEvent = async (task) => {
    if (!task.dueDate) return

    try {
      const token = await ensureToken()
      const { start, end } = TIME_MAP[task.time] ?? TIME_MAP.morning
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

      const event = {
        summary: task.title,
        description: task.description || "",
        start: { dateTime: `${task.dueDate}T${start}:00`, timeZone: tz },
        end: { dateTime: `${task.dueDate}T${end}:00`, timeZone: tz },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 30 },
            { method: "email", minutes: 60 },
          ],
        },
      }

      const res = await fetch(`${CALENDAR_API}/calendars/primary/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      customToast.toast.success("Adicionado ao Google Calendar! 📅")
    } catch (err) {
      // Não bloqueia o usuário por falha no Calendar
      console.warn("Google Calendar sync failed:", err)
    }
  }

  return { createEvent, hasCalendarAccess: !!calendarToken }
}
