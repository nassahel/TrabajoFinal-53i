import React, { useState } from "react";
import './styles/productosFormulario.css'
import { v4 as uuidv4 } from "uuid";

function ProductoFormulario(props) {

	const [input, setInput] = useState('')

	const manejarCambios = e =>{
		setInput(e.target.value)
	}

	const manejarProducto = e =>{
		e.preventDefault() // Esto es para que toda la aplicacion no se vuelva a cargar cuando mandamos algo
		const productoNuevo = {
			id: uuidv4(),
			text: input
		}

		props.onSubmit(productoNuevo) 
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