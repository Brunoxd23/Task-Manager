import React, { useEffect, useState } from "react"
import AnimatedIcon from "./AnimatedIcon"
import ProgressBar from "./ProgressBar"
import CloseButton from "./CloseButton"

const ToastContent = ({ message, type, duration, onClose, action }) => {
  const [exiting, setExiting] = useState(false)

  const colors = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  }

  const closeColors = {
    success: "text-green-500 hover:bg-green-100",
    error: "text-red-500 hover:bg-red-100",
    info: "text-blue-500 hover:bg-blue-100",
    warning: "text-yellow-500 hover:bg-yellow-100",
  }

  const actionColors = {
    success: "text-green-700 hover:bg-green-100 border-green-300",
    error: "text-red-700 hover:bg-red-100 border-red-300",
    info: "text-blue-700 hover:bg-blue-100 border-blue-300",
    warning: "text-yellow-700 hover:bg-yellow-100 border-yellow-300",
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(onClose, 350)
    }, duration - 350)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const dismiss = () => {
    setExiting(true)
    setTimeout(onClose, 350)
  }

  // Toast com ação (ex: desfazer exclusão) — X à esquerda
  if (action) {
    return (
      <div
        className={`relative overflow-hidden ${exiting ? "animate-slide-out" : "animate-slide-in"}`}
      >
        <div
          className={`flex items-center gap-3 ${colors[type]} rounded-lg border-l-4 px-3 py-3 shadow-lg`}
        >
          <button
            onClick={dismiss}
            aria-label="Fechar"
            className={`shrink-0 rounded-full p-1 transition-colors ${closeColors[type]}`}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M6 6l8 8M14 6l-8 8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex flex-1 items-center justify-between gap-3">
            <p className="text-sm font-semibold">{message}</p>
            <button
              onClick={() => {
                action.onClick()
                dismiss()
              }}
              className={`shrink-0 rounded-md border px-3 py-1 text-xs font-bold transition-colors ${actionColors[type]}`}
            >
              {action.label}
            </button>
          </div>
        </div>
        <ProgressBar duration={duration} type={type} />
      </div>
    )
  }

  // Toast simples — ícone à esquerda, X à direita
  return (
    <div
      className={`relative overflow-hidden ${exiting ? "animate-slide-out" : "animate-slide-in"}`}
    >
      <div
        className={`flex items-center gap-3 ${colors[type]} rounded-lg border-l-4 px-4 py-3 shadow-lg`}
      >
        <AnimatedIcon type={type} />
        <div className="flex-1">
          <p className="text-sm font-semibold">{message}</p>
        </div>
        <CloseButton onClick={dismiss} type={type} />
      </div>
      <ProgressBar duration={duration} type={type} />
    </div>
  )
}

export default ToastContent
