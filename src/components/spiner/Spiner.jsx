import React from 'react'
import spinner from '../../assets/img/loading-gif.gif'
import './spiner.css'

function Spiner() {
  return (
    <div className='cont container-fluid d-flex align-items-center justify-content-center'>
        <img height='80px' src={spinner} alt="loading" />
    </div>
  )
}

export default Spiner