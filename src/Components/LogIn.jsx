import React, { useRef, useState,useContext } from 'react'
import axios from 'axios'
import Modal from './Modal'
import { API } from '../Config'
import {UserContext} from '../Context/userContext'
import {Redirect} from 'react-router-dom'

const LogIn = () => {

  const {isAuth, setIsAuth, setUserId} = useContext(UserContext)
  const nameInput = useRef(null)
  const [modalMessage, setModalMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const passInput = useRef(null)

  const logInHandler = async () => {
    if(!nameInput.current.value.trim() || !passInput.current.value.trim()){
      setShowModal(true)
      setModalMessage('No dejes los campos vacíos')
    }else {
      const log = await axios.post(`${API}/user/login`,
      { 
        name: nameInput.current.value, 
        pass: passInput.current.value
      })

      if(log.data.success){
        setLoading(true)
        setShowModal(true)
        setModalMessage('Inicio de sesión exitoso')
        setTimeout(()=>{
          setIsAuth(true)
          setUserId(log.data.id)
        setLoading(false)

        },1000)
      }else{
        setShowModal(true)
        setModalMessage(log.data.message)
      }
    }
  }
  if(isAuth){
    return(
      <Redirect to="/"/>
    )
  }else{
    if(loading){
      return(
        <div className="container is-widescreen">
          <Modal message={modalMessage} active={showModal} setActive={setShowModal}/>
        <h1>Cargando</h1>
        <progress className="progress is-large is-info" max="100">60%</progress>
        </div>
      )
    }else{
      return (
        <div className="container is-widescreen">
        <Modal message={modalMessage} active={showModal} setActive={setShowModal}/>
        <br/>
        <h1 className="title is-1">Inicio de sesión</h1>
        <br/>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input ref={nameInput} className="input" type="email" placeholder="Nombre"/>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input ref={passInput} className="input" type="password" placeholder="Contraseña"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <br/>
          <div className="buttons">
            <button onClick={logInHandler} className="button is-success">Iniciar sesión</button>
          </div>
        </div>
      )
    }
  }
}

export default LogIn
