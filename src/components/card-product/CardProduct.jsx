import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'

export const CardComidas = ({ product, index, agregarProducto, eliminarProducto, agregarCarrito }) => {

    const [count, setCount] = useState(0);

    const incrementoValor = (product) => {
        if (count >= 0)
            setCount(count + 1)
        agregarProducto(product);
    }

    const disminuirValor = () => {
        if (count > 0)
            setCount(count - 1)
        eliminarProducto(product)
    }

    return (
        <div className="col col-lg-3">
            <div className="card rounded text-center border-1  p-1 h-100">
                <img className='img-fluid mx-auto rounded' src={product.image} alt={product.name} />
                <div className="card-body d-flex flex-column justify-content-end">
                    <h5 className='card-title'>{product.name}</h5>
                    <h5 className='card-title text-info'>${product.price}</h5>
                    <hr className='m-1' />
                    <h6>Cantidad</h6>
                    <div className='mb-3 d-flex justify-content-center'>
                        <AiFillMinusCircle size='25' color='green' onClick={() => disminuirValor(product)} />
                        <input className="w-25 border mx-2 text-center align-items" type="number" value={count} readOnly />
                        <AiFillPlusCircle size='25' color='green' onClick={() => incrementoValor(product)} />
                    </div>
                    <button
                        onClick={() => agregarCarrito(product)}
                        className='btn btn-outline-success text-dark border-2  fw-bold'>Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    )
}