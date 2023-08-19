import React from "react";

function ProductoFormulario(props) {
	return (
		<form className="producto-formulario">
			<input
			className="producto-input"
			 type="text"
			 name="texto"
			 placeholder="Agregue un producto"
			/>
			<button className="producto-boton">
				Agregar Producto
			</button>
		</form>
	)
}

export default ProductoFormulario