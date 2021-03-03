import React from 'react'
import axios from 'axios'
import {API} from '../Config'
import Modal from './Modal'


const Card = ({type,amount,desc,date,userID, id, refresh}) => {

  const [modalMessage, setModalMessage] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)

  const deleteHandler = async() => {
    let isSure = window.confirm("¿Estás seguro? Esta acción no se puede deshacer")
    if(isSure){
      const log = await axios.delete(`${API}/report/${userID}/${id}`)
      if(log.data.success){
        refresh()
      }else{
        setShowModal(true)
        setModalMessage(log.data.message)
      }
    }
  }

  return (
<div className="card" key={id}>
  <Modal message={modalMessage} active={showModal} setActive={setShowModal}/>
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-48x48">
          <img src={type === "Ingreso" ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Ambox_emblem_plus.svg/1200px-Ambox_emblem_plus.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ambox_emblem_minus.svg/1200px-Ambox_emblem_minus.svg.png'} alt="type"/>
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-4">Concepto: {desc} &nbsp; <i onClick={deleteHandler} className="fas fa-trash"></i></p>
        <p className="subtitle is-6">Importe: {type === "Ingreso" ? ` + ${amount}` : ` ${amount}`}</p>
      </div>
    </div>
    <div className="content">
    <time dateTime="2016-1-1">Fecha: {date.split('T')[0]}</time>
    </div>
  </div>
</div>
  )
} 

export default Card
