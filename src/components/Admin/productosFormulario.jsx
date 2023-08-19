import React from "react";
import './styles/productosFormulario.css'

function ProductoFormulario(props) {
	return (
		<form className="producto-formulario">
			<input
			className="producto-input"
			 type="text"
			 name="texto"
			 placeholder="Agregue un producto"
			/>
			<button className="producto-boton btn btn-dark">
				Agregar Producto
			</button>
		</form>
	)
}

export default ProductoFormulario