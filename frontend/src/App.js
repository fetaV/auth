// App.js
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Workout from "./Workout"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location = "/"
  }
  return (
    <div className="App">
      <button onClick={handleLogout}>Logout</button>

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workout" element={<Workout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
