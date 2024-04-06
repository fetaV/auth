import React from "react"

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location = "/"
  }
  const isLoggedIn = localStorage.getItem("token")

  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
          <div className="container">
            <div className="navbar-brand me-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height={16}
                alt="MDB Logo"
                loading="lazy"
                style={{ marginTop: "-1px" }}
              />
            </div>
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
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger px-3 me-2"
                  >
                    Logout
                  </button>
                ) : (
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
                <div
                  data-mdb-ripple-init=""
                  className="btn btn-dark px-3 "
                  role="button"
                >
                  <i className="fab fa-github hide" />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    </div>
  )
}

export default Navbar
