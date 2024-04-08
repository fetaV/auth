import React from "react"

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token")
  const userName = localStorage.getItem("username")
  const isAdmin = localStorage.getItem("isAdmin")

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("isAdmin")
    window.location = "/login"
  }

  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
          <div className="navbar-brand me-2">LOGO</div>
          <button
            data-mdb-collapse-init=""
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link">Dashboard</div>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {!isLoggedIn && (
                <>
                  <a
                    data-mdb-ripple-init=""
                    type="button"
                    className="btn btn-success px-3 me-2"
                    href="/login"
                  >
                    Login
                  </a>
                  <a
                    data-mdb-ripple-init=""
                    type="button"
                    className="btn btn-primary me-3"
                    href="/register"
                  >
                    Sign up for free
                  </a>
                </>
              )}
              {userName && (
                <div
                  data-mdb-ripple-init=""
                  className="btn btn-dark px-3 me-3 dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  role="button"
                >
                  {userName}
                </div>
              )}
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/workout">
                    Workout
                  </a>
                </li>
                {isAdmin && (
                  <li>
                    <a className="dropdown-item" href="/table">
                      Table
                    </a>
                  </li>
                )}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item bg-danger text-white "
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    </div>
  )
}

export default Navbar
