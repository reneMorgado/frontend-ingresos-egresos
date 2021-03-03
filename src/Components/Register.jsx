import React, { useRef, useState,useContext } from 'react'
import axios from 'axios'
import Modal from './Modal'
import { API } from '../Config'
import {UserContext} from '../Context/userContext'
import {Redirect} from 'react-router-dom'

const Register = () => {

  const {isAuth, setIsAuth, setUserId} = useContext(UserContext)
  const nameInput = useRef(null)
  const passInput = useRef(null)
  const passInputConfirm = useRef(null)
  const [modalMessage, setModalMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [passMessage, setPassMessage] = useState('')
  const [loading, setLoading] = useState(false)


  const checkSameHandler = (e) => {
    if(passInput.current.value === passInputConfirm.current.value){
      setPassMessage('Las contraseñas coinciden')
    }else{
      setPassMessage('Las contraseñas NO coinciden')
    }
  }

  const registerHandler = async () => {
    if(!nameInput.current.value.trim() || !passInput.current.value.trim()){
      setShowModal(true)
      setModalMessage('No dejes los campos vacíos')
    }else {
      const log = await axios.post(`${API}/user/`,
      { 
        name: nameInput.current.value, 
        pass: passInput.current.value
      })
      if(log.data.success){
        setLoading(true)
        setShowModal(true)
        setModalMessage('Registrado exitosamente')
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
        <h1 className="title is-1">Registro</h1>
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
              <input onChange={checkSameHandler} ref={passInput} className="input" type="password" placeholder="Contraseña"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input onChange={checkSameHandler} ref={passInputConfirm} className="input" type="password" placeholder="Confirmar contraseña"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
            <h6 className="subtitle is-6">{passMessage}</h6>
          </div>
          <div className="buttons">
            <button onClick={registerHandler} className="button is-success">Registrarme</button>
          </div>
        </div>
      )
    }
    
  }
}

export default Register
