/* eslint-disable react/jsx-key */
import { useState } from "react"
import Header from "./Header"

function Task() {
  const [inputValue, setInputValue] = useState("Teste")
  const [messages, setMessages] = useState([
    "Hello World",
    "Welcome to the Task Manager",
  ])

  function handleButtonClick() {
    setMessages([...messages, inputValue])
  }

  return (
    <div>
      <Header></Header>
      <input
        type="text"
        placeholder="Create your task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleButtonClick}>Add Message</button>
      <ul>
        {messages.map((message) => {
          return <li>{message}</li>
        })}
      </ul>
    </div>
  )
}

export default Task
