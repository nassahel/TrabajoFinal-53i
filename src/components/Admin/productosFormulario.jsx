import React, { useState } from "react";
import './styles/productosFormulario.css'

function ProductoFormulario(props) {

	const [input, setInput] = useState('')

	const manejarCambios = e =>{
		setInput(e.target.value)
		console.log(e.target.value);
	}

	const manejarProducto = e =>{
		const productoNuevo = {
			id: '35565',
			text: 'Hola'
		}
	}

	return (
		<form 
		  className="producto-formulario"
		  onSubmit={manejarProducto}
		>
			<input
			className="producto-input"
			 type="text"
			 name="texto"
			 placeholder="Agregue un producto"
			 onChange={manejarCambios}
			/>
			<button className="producto-boton btn btn-dark">
				Agregar Producto
			</button>
		</form>
	)
}

export default ProductoFormulario