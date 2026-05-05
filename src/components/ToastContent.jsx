import React from "react"
import AnimatedIcon from "./AnimatedIcon"
import ProgressBar from "./ProgressBar"
import CloseButton from "./CloseButton"

const ToastContent = ({ message, type, duration, onClose }) => {
  const colors = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex items-center ${colors[type]} animate-slide-in rounded-lg border-l-4 px-4 py-3 shadow-lg`}
      >
        <AnimatedIcon type={type} />
        <div className="flex-1">
          <p className="text-sm font-semibold">{message}</p>
        </div>
        <CloseButton onClick={onClose} type={type} />
      </div>
      <ProgressBar duration={duration} type={type} />
    </div>
  )
}

export default ToastContent
