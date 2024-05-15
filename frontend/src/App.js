// App.js
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Workout from "./Workout"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar"
import Table from "./Table"
import Home from "./Home"
import Maas from "./Maas"
import Maas2 from "./Maas2"
import Maas3 from "./Maas3"

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/maas" element={<Maas />} />
            <Route path="/maas2" element={<Maas2 />} />
            <Route path="/maas3" element={<Maas3 />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
