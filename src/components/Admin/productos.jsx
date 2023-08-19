import React from "react";
import './productos.css'
import { AiOutlineCloseCircle } from "react-icons/ai";

function Productos({ texto }) {
  return(
    <div className="producto-contenedor">
      <div className="producto-texto">
        {texto}
      </div>
      <div className="producto-iconos-contenedor">
        <AiOutlineCloseCircle  className="producto-icono" />
      </div>
    </div>
  );
}

export default Productos