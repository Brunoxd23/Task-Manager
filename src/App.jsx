import Sidebar from "./components/sidebar"
import Task from "./components/Task"

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Task />
      </div>
    </div>
  )
}

export default App
