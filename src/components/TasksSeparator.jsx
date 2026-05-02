const TasksSeparator = ({ title, Icon }) => {
  return (
    <div className="[#f4f4f5] flex gap-2 border-b border-solid pb-1">
      {Icon && <Icon className="h-4 w-4 text-[#737373]" />}
      <p className="text-sm font-medium text-[#737373]">{title}</p>
    </div>
  )
}

export default TasksSeparator
