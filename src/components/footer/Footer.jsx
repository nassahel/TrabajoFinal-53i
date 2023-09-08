import React from 'react'
import "./footer.css"

function Footer() {
  return (
    <div className="container-fluid footer d-flex justify-content-between text-center py-3 px-3 mt-4" >
      <div className="col-3 text-start">
        <div className="social-media mb-1" >
          <img width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png" alt="" />
          <img width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="" />
          <img width="30" src="https://seeklogo.com/images/T/tiktok-logo-DA8B60CAD7-seeklogo.com.png" alt="" />
        </div>
        <div className="tel mb-1">+54912345678</div>
        <div className="direction mb-1">Av. Nombre nombre 123</div>
      </div>
      <div className="col-3">
        <div className="res-name">Santorini Restaurant</div>
        <div className="derechos">© Todos los derechos reservados</div>
      </div>
      <div className="col-3 text-start">
        <div className="contactUs">Contáctanos</div>
        <div className="aboutUs">Acerca de nosotros </div>
        <div className="work">Trabaja con nosotros</div>
      </div>
    </div>
  )
}

export default Footer