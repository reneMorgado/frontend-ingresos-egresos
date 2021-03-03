import React, { useContext } from 'react'
import { UserContext } from '../Context/userContext'
import {Link} from 'react-router-dom'

const Index = () => {
  const {isAuth} = useContext(UserContext)
  return (
    <div className="container">
      <section className="hero is-link">
  <div className="hero-body">
    <p className="title">
      Bienvenido!
    </p>
    <p className="subtitle">
      Aquí podrás llevar el registro de tus ingresos y egresos
    </p>
  </div>
</section>
<br/>
{isAuth 
  ?
  <div className="buttons">
    <Link to="/report" className="button is-success">Mis registros</Link>
  </div>
  :
  <div className="buttons">
    <Link to="/login" className="button is-primary">Iniciar sesión</Link>
    <Link to="/register" className="button is-link">Registrarse</Link>
  </div>
}

    </div>
  )
}

export default Index
