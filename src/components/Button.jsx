const Button = ({ children, variant = "primary", ...rest }) => {
  const getVariantClass = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] dark:border-white hover:bg-[#0097A7] text-white"
    }
    if (variant === "secondary") {
      return "bg-transparent border dark:border-white hover:bg-red-600 bg-[#00ADB5] hover:text-white"
    }

    if (variant === "tertiary") {
      return "bg-transparent border dark:border-white hover:bg-red-600 text-red-500 hover:text-white"
    }
  }
  return (
    <button
      className={`flex items-center gap-3 rounded-md border border-black px-3 py-1 text-xs font-semibold ${getVariantClass()}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
