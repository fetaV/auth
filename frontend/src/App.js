// App.js
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Workout from "./Workout"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workout" element={<Workout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
