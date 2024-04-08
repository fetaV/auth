import React, { useState, useEffect } from "react"
import axios from "axios"

function Table() {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/api/auth/register", {
        username,
        email,
        password,
      })
      window.location = "/table"
    } catch (error) {
      console.error(error.response.data)
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("/api/auth/users", {
          headers: {
            Authorization: token,
          },
        })

        const filteredUsers = response.data.filter(
          user => user.username !== "admin" && user.email !== "admin@admin.com"
        )

        setUsers(filteredUsers)
      } catch (error) {
        console.error(error.response.data)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async userId => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`/api/auth/users/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const handleEdit = userId => {
    // Düzenleme işlemleri burada yapılabilir
    console.log("Edit user with ID:", userId)
  }

  return (
    <div className="container">
      <button
        className="btn btn-success mr-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add New User
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mail</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add New User
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="form-outline form-white mb-4">
                <label className="form-label" htmlFor="typeEmailX">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="form-control form-control-lg"
                />
              </div>
              <div className="form-outline form-white mb-4">
                <label className="form-label" htmlFor="typeEmailX">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="form-control form-control-lg"
                />
              </div>
              <div className="form-outline form-white mb-4">
                <label className="form-label" htmlFor="typePasswordX">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="form-control form-control-lg"
                />
              </div>
              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleSubmit}
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

export default Table
