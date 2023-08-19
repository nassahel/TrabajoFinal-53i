import React from "react";

function Productos({ texto }) {
  return(
    <div className="producto-contenedor">
      <div className="producto-texto">
        {texto}
      </div>
      <div className="producto-icono">
        Eliminar
      </div>
    </div>
  );
}

export default Productos