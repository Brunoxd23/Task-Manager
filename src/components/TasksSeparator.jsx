const TasksSeparator = ({ title, Icon }) => {
  return (
    <div className="flex items-center gap-2 border-b pb-2 text-gray-400">
      {Icon && <Icon className="h-5 w-5" />}
      <p className="text-sn text-[#9A9C9F]">{title}</p>
    </div>
  )
}

export default TasksSeparator
