import React from "react";
import '../Admin/styles/productos.css'
import { AiOutlineCloseCircle } from "react-icons/ai";

function Productos({ texto, id, eliminarProducto }) {
  return(
    <div className="producto-contenedor">
      <div className="producto-texto">
        {texto}
      </div>
      <div className="producto-iconos-contenedor"
        onClick={eliminarProducto(id)}>
        <AiOutlineCloseCircle  className="producto-icono" />
      </div>
    </div>
  );
}

export default Productos