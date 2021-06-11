import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Logo, NavDropdown } from "components"
import "./Navbar.css"

const determineIfLogoIsDark = (location) => {
  if (location.pathname.indexOf("dashboard") !== -1) return true
  if (location.pathname.indexOf("listings") !== -1) {
    if (location.pathname.indexOf("new") === -1) return true
  }
  if (location.pathname.indexOf("profile") !== -1) return true

  return false
}

const Navbar = ({ user, isAuthenticated, logoutUser }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isLogoDark = determineIfLogoIsDark(location)
  const [open, setOpen] = useState(false)

  const handleOnLogout = async () => {
    await logoutUser()
    navigate("/")
  }

  return (
    <nav className="Navbar">
      <Link to="/">
        <span className="navbar-brand">
          <Logo dark={isLogoDark} />
        </span>
      </Link>

      <ul className="navbar-links">
        {isAuthenticated ? (
          <li>
            <NavDropdown open={open} setOpen={setOpen} user={user} logoutUser={handleOnLogout} />
          </li>
        ) : (
          <>
            <li className="nav-link">
              <Link to="/register">
                <Button buttonType="primary">Create Account</Button>
              </Link>
            </li>

            <li className="nav-link">
              <Link to="/login">
                <Button buttonType="secondary">Sign In</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
