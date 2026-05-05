import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { usePersistedTasks } from "../hooks/usePersistedTasks"
import TASKS from "../constants/tasks"

const QUOTES = [
  "A jornada de mil quilômetros começa com um único passo.",
  "Foco, disciplina e constância constroem grandes resultados.",
  "Cada tarefa concluída é uma vitória.",
  "Organização é o segredo da produtividade.",
  "Pequenos avanços todos os dias levam a grandes conquistas.",
]

const todayQuote = QUOTES[new Date().getDay() % QUOTES.length]

const StatCard = ({ label, value, color }) => (
  <div className="flex flex-col items-center rounded-2xl bg-gray-50 px-4 py-4 dark:bg-gray-700 md:px-6 md:py-5">
    <span className={`text-2xl font-bold md:text-3xl ${color}`}>{value}</span>
    <span className="mt-1 text-center text-xs text-gray-400">{label}</span>
  </div>
)

const Home = () => {
  const navigate = useNavigate()
  const [tasks] = usePersistedTasks(TASKS)

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === "done").length
    const inProgress = tasks.filter((t) => t.status === "in_progress").length
    const pending = tasks.filter((t) => t.status === "not_started").length
    const overdue = tasks.filter(
      (t) =>
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
    ).length
    return { done, inProgress, pending, overdue, total: tasks.length }
  }, [tasks])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-lg">
        {/* Saudação */}
        <div className="mb-6 text-center md:mb-8">
          <p className="text-sm font-medium text-[#00ADB5]">{greeting} 👋</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">
            Bem-vindo ao Task Manager
          </h1>
          <p className="mt-3 text-sm italic text-gray-400">
            &quot;{todayQuote}&quot;
          </p>
        </div>

        {/* Stats */}
        {stats.total > 0 ? (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mb-8">
            <StatCard
              label="Total"
              value={stats.total}
              color="text-gray-700 dark:text-white"
            />
            <StatCard
              label="Concluídas"
              value={stats.done}
              color="text-teal-500"
            />
            <StatCard
              label="Em andamento"
              value={stats.inProgress}
              color="text-yellow-500"
            />
            <StatCard
              label={stats.overdue > 0 ? "Atrasadas" : "Pendentes"}
              value={stats.overdue > 0 ? stats.overdue : stats.pending}
              color={
                stats.overdue > 0
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-300"
              }
            />
          </div>
        ) : (
          <div className="mb-6 rounded-2xl bg-gray-50 py-10 text-center dark:bg-gray-700 md:mb-8">
            <p className="text-sm text-gray-400">
              Nenhuma tarefa cadastrada ainda.
            </p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate("/minhas-tarefas")}
          className="w-full rounded-2xl bg-[#00ADB5] py-4 text-sm font-semibold text-white shadow transition hover:bg-[#009aa1] active:scale-95 md:py-3.5"
        >
          {stats.total > 0 ? "Ver minhas tarefas →" : "Criar primeira tarefa →"}
        </button>
      </div>
    </div>
  )
}

export default Home
