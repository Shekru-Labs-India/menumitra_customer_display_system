import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const authData = JSON.parse(localStorage.getItem("authData"));
  const outletName = authData?.outlet_name; // Get 
  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    // The Link component will handle the navigation to /login
  };
  return (
    <header className="bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark py-2">
        <div className="container-fluid px-5">
          {/* Brand/Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="fs-4 fw-bold">{outletName?.toUpperCase()}</span>
          </Link>

          {/* Navigation Links */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item fs-3">
              <Link to="/login" className={`nav-link px-3`} onClick={handleLogout}>
                <i className="bx bx-log-out"></i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

// Clock Component
function Clock() {
  const [time, setTime] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="d-flex align-items-center">
      <i className="bi bi-clock me-2"></i>
      {time.toLocaleTimeString()}
    </div>
  )
}

export default Header
