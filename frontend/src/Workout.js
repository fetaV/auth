import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Workout() {
  const [workouts, setWorkouts] = useState([])
  const [title, setTitle] = useState("")
  const [reps, setReps] = useState(0)
  const [load, setLoad] = useState(0)
  const [editWorkoutId, setEditWorkoutId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editReps, setEditReps] = useState(0)
  const [editLoad, setEditLoad] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location = "/login"
    }
  }, [])

  const handleEditModalOpen = workoutId => {
    setEditWorkoutId(workoutId)

    const workoutToEdit = workouts.find(workout => workout._id === workoutId)
    setEditTitle(workoutToEdit.title)
    setEditReps(workoutToEdit.reps)
    setEditLoad(workoutToEdit.load)
  }

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
      setWorkouts([newWorkout, ...workouts])
      setTitle("")
      setReps(0)
      setLoad(0)
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const handleEdit = async userId => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `/api/workout/${userId}`,
        { title: editTitle, reps: editReps, load: editLoad }, // düzenleme modalından alınan değerleri kullanın
        {
          headers: {
            Authorization: token,
          },
        }
      )
      toast.success("Workout updated successfully!")
      window.location = "/workout"
      console.log("Workout information:", response.data)
    } catch (error) {
      console.error(error.response.data)
      toast.error(error.response.data.message)
    }
  }

  const handleDelete = async userId => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/workout/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      setWorkouts(workouts.filter(user => user._id !== userId))
      toast.success("Workout deleted successfully!")
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        <div className="col-md-4">
          <h2>Add Workout</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label htmlFor="typeTitleX" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="typeTitleX"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="typeRepsX" className="form-label">
                Reps
              </label>
              <input
                type="number"
                className="form-control"
                id="typeRepsX"
                placeholder="Reps"
                value={reps}
                onChange={e => setReps(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="typeLoadX" className="form-label">
                Load
              </label>
              <input
                type="number"
                className="form-control"
                id="typeLoadX"
                placeholder="Load"
                value={load}
                onChange={e => setLoad(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Save
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <h2>Workout List</h2>
          <ul className="list-group mt-3">
            {workouts.map((workout, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <p>Title: {workout.title}</p>
                  <p>Reps: {workout.reps}</p>
                  <p>Load: {workout.load}</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning me-2 text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEditModalOpen(workout._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Workout Update
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mt-3">
                <label htmlFor="editTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editTitle"
                  placeholder="Title"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="editReps" className="form-label">
                  Reps
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editReps"
                  placeholder="Reps"
                  value={editReps}
                  onChange={e => setEditReps(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="editLoad" className="form-label">
                  Load
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="editLoad"
                  placeholder="Load"
                  value={editLoad}
                  onChange={e => setEditLoad(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleEdit(editWorkoutId)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Workout
