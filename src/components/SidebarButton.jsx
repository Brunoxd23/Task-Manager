const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselect") {
      return "sidebar-button bg-[#E6F7F8] text-[black] hover:bg-[#00ADB5] hover:text-white transition-colors duration-300 "
    }
    if (variant === "select") {
      return "sidebar-button bg-[#E6F7F8] text-[black] hover:bg-[#00ADB5] hover:text-white transition-colors duration-300 "
    }
  }
  return (
    <a
      href="#"
      className={`flex items-center gap-3 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}

export default SidebarButton
