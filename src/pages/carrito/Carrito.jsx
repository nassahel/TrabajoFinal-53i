import React, { useState } from "react";
import Main from "../../components/main/Main";
import MostWanted from "../../components/mostWanted/MostWanted";

function Carrito() {
  const [items, setItems] = useState([
    {name:"arroz", costo:1000}, {name: "carne", costo:500}
  ]);

  console.log(items.reduce((suma,actual) => {suma + actual.costo}, 0))

  return (
    <div className="container-fluid main-cont d-flex flex-column align-items-center">
      <img
        className="col-11 col-lg-6 pt-4 my-4"
        src="src\assets\img\Titulo_proyecto_final.jpg"
        alt=""
      />
      <div>
        <p>{items.reduce((suma,actual) => suma + actual.costo, 0)}</p>
        {items.length === 0 ? (
          <p>No hay nada wachin</p>
        ) : (
          items.map((i, index) => <p key={index}>{i.name}|{i.costo}</p>)
        )}
      </div>
    </div>
  );
}

export default Carrito;
