const SidebarButton = ({ children, variant }) => {
  const getVariantClasses = () => {
    if (variant === "unselect") {
      return "bg-[#E6F7F8]"
    }
    if (variant === "select") {
      return " bg-[#00ADB5] text-white"
    }
  }
  return (
    <a href="#" className={`rounded-lg px-6 py-3 ${getVariantClasses()}`}>
      {children}
    </a>
  )
}

export default SidebarButton
