import React from "react"

const ProgressBar = ({ duration, type }) => {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg bg-gray-100">
      <div
        className={`h-full ${colors[type]} animate-progress`}
        style={{
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
        }}
      />
    </div>
  )
}

export default ProgressBar
