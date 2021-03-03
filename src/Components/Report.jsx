import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import { UserContext } from '../Context/userContext'
import {API} from '../Config'
import Modal from './Modal'
import Card from './Card'



const Report = () => {
  const {userId, isAuth} = useContext(UserContext)
  const [data, setData] = useState([])
  const [user, setUser] = useState({})
  const [balance, setBalance] = useState(0)
  const [ingreso, setIngreso] = useState(true)
  const[loading,setLoading] = useState(true)

  const [modalMessage, setModalMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const ConRef = useRef(null)
  const CanRef = useRef(null)
  const MovRef = useRef(null)

  const fetchData = async() => {
    const getLog = await axios.get(`${API}/report/${userId}`)
    setData(getLog.data.reports)

    const getBalance = await axios.get(`${API}/report/${userId}/amount`)
    setBalance(getBalance.data.balance)

    const getUser = await axios.get(`${API}/user/${userId}`)
    setUser(getUser.data.user)

    setLoading(false)
  }

  useEffect(()=>{
    const loadThis = async() => {
      const getLog = await axios.get(`${API}/report/${userId}`)
      setData(getLog.data.reports)
  
      const getBalance = await axios.get(`${API}/report/${userId}/amount`)
      setBalance(getBalance.data.balance)
  
      const getUser = await axios.get(`${API}/user/${userId}`)
      setUser(getUser.data.user)
  
      setLoading(false)
    }
    loadThis()
  },[userId])

  const ingresoHandler = (e) => {
    if(e.target.value === "Ingreso"){
      setIngreso(true)
    }else{
      setIngreso(false)
    }
  }

  const AddHandler = async() => {
    if(!ConRef.current.value.trim() || !CanRef.current.value.trim()){
      setShowModal(true)
      setModalMessage('Llene correctamente todos los campos')
      return 0
    }
    if (CanRef.current.value <= 0 || CanRef.current.value >= 100000){
      setShowModal(true)
      setModalMessage('Introduzca una catidad de dinero válida')
      return 0
    }
    if (ConRef.current.value.length >= 80){
      setShowModal(true)
      setModalMessage('Max. 80 caracteres en concepto')
      return 0
    }
    const log = await axios.post(`${API}/report/${userId}`,{
      operation: MovRef.current.value,
      amount: parseInt(CanRef.current.value,10),
      desc: ConRef.current.value
    })

    if(log.data.success){
      setShowModal(true)
      setModalMessage('Añadido correctamente')
      fetchData()
    }else{
      setShowModal(true)
      setModalMessage('Ha ocurrido un error')
    }
  }

  if(isAuth){
    if(loading){
      return(
        <div className="container is-widescreen">
          <Modal message={modalMessage} active={showModal} setActive={setShowModal}/>
        <h1>Cargando</h1>
        <progress className="progress is-large is-info" max="100"></progress>
        </div>
      )
    }else{
      return(
        <div className="container is-max-desktop">
        <Modal message={modalMessage} active={showModal} setActive={setShowModal}/>
        <br/>
          <div className="notification is-success">
            <h2 className="title is-2">Hola, {user.name}. Tu balance es de ${balance} MXN</h2>
          </div>
          <br/>
          <div className="card">
  
            <div className="card-content">
              <div className="field">
                <label className="label">Concepto</label>
                <div className="control">
                  <input ref={ConRef} className="input" type="text" placeholder="Concepto"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Cantidad</label>
                <div className="control">
                  <input ref={CanRef} className="input" type="number" min="0" placeholder="Cantidad"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Tipo de movimiento</label>
                <div className="control">
                  <div className={`select ${ingreso ? 'is-success' : 'is-danger'}`}>
                    <select ref={MovRef} onChange={ingresoHandler}>
                      <option value="Ingreso">Ingreso</option>
                      <option value="Egreso">Egreso</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <footer className="card-footer">
                <div className="buttons card-footer-item">
                  <button onClick={AddHandler} className="button is-primary">Añadir {ingreso ? 'ingreso' : 'egreso'} </button>
                </div>
            </footer>
          </div>
          <br/>
          {data.map((dat,index)=>(
            <React.Fragment>
              <Card key={index+10} type={dat.operation} amount={dat.amount} desc={dat.desc} date={dat.date} userID={userId} id={dat._id} refresh={fetchData}/>
              <br/>
            </React.Fragment>
          ))}
        </div>)   
    }
  }else{
    return(
      <Redirect to="/login"/>
    )
  }
}

export default Report
