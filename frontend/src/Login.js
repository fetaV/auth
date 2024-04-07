import React, { useState } from "react"
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/auth/login", { email, password })
      localStorage.setItem("token", response.data.token)
      window.location = "/workout"
    } catch (error) {
      console.error(error.response.data)
      setError(error.response.data.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="vh-100 gradient-custom">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-50">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>
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
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>
                      {error && (
                        <div class="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2" />
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg" />
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <a href="/register" className="text-white-50 fw-bold">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}

export default Login
