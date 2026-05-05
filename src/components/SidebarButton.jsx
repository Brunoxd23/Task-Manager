// SidebarButton mantido para compatibilidade, mas Sidebar agora usa botões inline
const SidebarButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      active
        ? "bg-[#00ADB5] text-white shadow-sm"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
    }`}
  >
    {children}
  </button>
)

export default SidebarButton
