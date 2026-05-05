const TasksSeparator = ({ title, Icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid pb-1 dark:border-gray-600">
      {Icon && <Icon className="h-4 w-4 text-[#737373] dark:text-gray-400" />}
      <p className="text-sm font-medium text-[#737373] dark:text-gray-400">
        {title}
      </p>
    </div>
  )
}

export default TasksSeparator
