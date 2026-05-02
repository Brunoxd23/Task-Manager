const TasksItem = ({ Task }) => {
  const getStatusClass = () => {
    if (Task.status === "done") {
      return "bg-[#00ADB5] bg-opacity-50 text-white"
    }
    if (Task.status === "in_progress") {
      return "bg-[#FFAA04] bg-opacity-50 text-white"
    }
    if (Task.status === "not_started") {
      return "bg-[#737373] bg-opacity-50 text-gray-800"
    }
  }

  return (
    <div
      className={`flex items-center rounded-lg px-4 py-3 ${getStatusClass()}`}
    >
      {Task.title}
    </div>
  )
}

export default TasksItem
