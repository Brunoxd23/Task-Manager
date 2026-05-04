import Sidebar from "./components/sidebar"
import Task from "./components/Task"
import { Toaster } from "sonner"

function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            background: "#00bfae",
            color: "#fff",
          },
        }}
      />
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Task />
      </div>
    </div>
  )
}

export default App
