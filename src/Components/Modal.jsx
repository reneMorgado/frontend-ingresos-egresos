import React from 'react'

const Modal = ({message, active, setActive}) => {
  return (
    <div className={`modal ${active && 'is-active'}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={()=>setActive(false)}></button>
    </div>
  )
}

export default Modal
