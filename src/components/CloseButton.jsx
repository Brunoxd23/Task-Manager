import React from "react"

const CloseButton = ({ onClick, type }) => {
  const colors = {
    success: "hover:bg-green-100 text-green-500",
    error: "hover:bg-red-100 text-red-500",
    info: "hover:bg-blue-100 text-blue-500",
    warning: "hover:bg-yellow-100 text-yellow-500",
  }
  return (
    <button
      onClick={onClick}
      className={`absolute -top-1 right-2 rounded-full p-1 transition-colors focus:outline-none ${colors[type]}`}
      aria-label="Fechar"
      tabIndex={0}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.12" />
        <path
          d="M6 6L12 12M12 6L6 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )
}

export default CloseButton
