import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="container-fluid footer d-flex justify-content-between text-center py-4 px-3" >
      <div className="col-4 text-start">
        <div className="social-media mb-2 ">
          <Link to='notFound' className='text-decoration-none'><img width="30" className='me-1' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="" />          </Link>
          <Link to='notFound' className='text-decoration-none'><img width="30" className='me-1' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="" />          </Link>
          <Link to='notFound' className='text-decoration-none'><img width="30" src="https://seeklogo.com/images/T/tiktok-logo-DA8B60CAD7-seeklogo.com.png" alt="" /> </Link>
        </div>
        <div className="tel mb-1">Tel: 12345678</div>
        <div className="direction mb-1">Av. Nombre nombre 123</div>
      </div>
      <div className="col-4">
        <Link to='/' className="text-decoration-none">
          <div className="res-name">Santorini Restaurant</div>
        </Link>
        <div className="derechos">© Todos los derechos reservados</div>
      </div>
      <div className="col-4 text-end">
        <Link to='notFound' className="text-decoration-none text-light"><div className="contactUs">Contáctanos</div></Link>
        <Link to='about' className="text-decoration-none text-light"><div className="aboutUs">Acerca de nosotros </div></Link>
        <Link to='notFound' className="text-decoration-none text-light"><div className="work">Trabaja con nosotros</div></Link>
      </div>
    </div>
  )
}

export default Footer