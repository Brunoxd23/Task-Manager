import { toast as sonnerToast } from "sonner"
import React from "react"
import ToastContent from "./ToastContent"

export const toast = {
  success: (message, options = {}) => {
    const duration = options.duration || 4000
    return sonnerToast.custom(
      (t) => (
        <ToastContent
          message={message}
          type="success"
          duration={duration}
          onClose={() => sonnerToast.dismiss(t)}
        />
      ),
      {
        duration,
        position: options.position || "bottom-right",
        className: "!p-0 !bg-transparent !shadow-none",
        ...options,
      }
    )
  },

  error: (message, options = {}) => {
    const duration = options.duration || 4000
    return sonnerToast.custom(
      (t) => (
        <ToastContent
          message={message}
          type="error"
          duration={duration}
          action={options.action}
          onClose={() => sonnerToast.dismiss(t)}
        />
      ),
      {
        duration,
        position: options.position || "bottom-right",
        className: "!p-0 !bg-transparent !shadow-none",
        ...options,
      }
    )
  },

  info: (message, options = {}) => {
    const duration = options.duration || 4000
    return sonnerToast.custom(
      (t) => (
        <ToastContent
          message={message}
          type="info"
          duration={duration}
          onClose={() => sonnerToast.dismiss(t)}
        />
      ),
      {
        duration,
        position: options.position || "bottom-right",
        className: "!p-0 !bg-transparent !shadow-none",
        ...options,
      }
    )
  },

  warning: (message, options = {}) => {
    const duration = options.duration || 4000
    return sonnerToast.custom(
      (t) => (
        <ToastContent
          message={message}
          type="warning"
          duration={duration}
          onClose={() => sonnerToast.dismiss(t)}
        />
      ),
      {
        duration,
        position: options.position || "bottom-right",
        className: "!p-0 !bg-transparent !shadow-none",
        ...options,
      }
    )
  },
}
