import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../Context/userContext'
import './Navbar.css'

const Navbar = () => {
  const {isAuth, setIsAuth, setUserId} = useContext(UserContext)
  const [dropdown, setDropdown] = useState(false)
  return (

<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link to="/" className="navbar-item" href="https://bulma.io">
      <img src="https://renemorgado.github.io/img/Logo_black.png" width="112" height="28" alt="logo"/>
    </Link>

    <Link to="#" role="button" className={`navbar-burger ${dropdown && 'is-active'}`} onClick={()=>setDropdown(!dropdown)} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </Link>
  </div>

  <div id="navbarBasicExample" className={`navbar-menu ${dropdown && 'is-active'}`}>
  {isAuth ? 
  <React.Fragment>
    <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Inicio
          </Link>
      <Link to="/report" className="navbar-item">
            <strong>Mi reporte de ingresos y egresos</strong>
          </Link>

    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link onClick={()=>{
              setIsAuth(false);
              setUserId('')
          }} className="button is-danger">
            <strong>Cerrar sesión</strong>
          </Link>
        </div>
      </div>
    </div>
  </React.Fragment>
    :
    <React.Fragment>
      <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Inicio
            </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/register" className="button is-primary">
              <strong>Registro</strong>
            </Link>
            <Link to="/login" className="button is-light">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
    }



  </div>
</nav>

  )
}

export default Navbar
