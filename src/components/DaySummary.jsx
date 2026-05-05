const DaySummary = ({ tasks }) => {
  const total = tasks.length
  const done = tasks.filter((t) => t.status === "done").length
  const pct = total ? Math.round((done / total) * 100) : 0

  const getMessage = () => {
    if (total === 0) return "Nenhuma tarefa por hoje."
    if (pct === 100) return "Todas as tarefas concluídas! 🎉"
    if (pct >= 50) return "Mais da metade concluída, continue assim! 💪"
    if (done > 0) return "Você consegue! Bora lá! 🎯"
    return "Comece sua primeira tarefa do dia! 🚀"
  }

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {done} de {total}{" "}
          {total === 1 ? "tarefa concluída" : "tarefas concluídas"}
        </span>
        <span className="text-sm font-semibold text-[#00ADB5]">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600">
        <div
          className="h-2 rounded-full bg-[#00ADB5] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400">{getMessage()}</p>
    </div>
  )
}

export default DaySummary
