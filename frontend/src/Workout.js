import React, { useState, useEffect } from "react"
import axios from "axios"

function Workout() {
  const [workouts, setWorkouts] = useState([])
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState(0)
  const [load, setLoad] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location = "/login"
    }
  })

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("/api/workout", {
          headers: {
            Authorization: token,
          },
        })
        setWorkouts(response.data)
      } catch (error) {
        console.error(error.response.data)
      }
    }

    fetchWorkouts()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location = "/"
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "/api/workout",
        { title, reps, load },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      const newWorkout = { title, reps, load }
      setWorkouts([...workouts, newWorkout])
      setTitle("")
      setReps(0)
      setLoad(0)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h2>Workout</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>Title: {workout.title}</p>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={e => setReps(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Load"
          value={load}
          onChange={e => setLoad(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Workout
