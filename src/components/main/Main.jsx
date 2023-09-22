import { useState, useEffect } from 'react'
import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'

function Main({ products, searchTerm, loading }) {

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className='container'>
            <h2 className='text-center mt-3 text-light bg-warning py-2 bg-opacity-75'>Productos</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : filteredProducts.map((product) => (

                    <div className="col col-lg-3">
                        <div className="card text-center border-4 border-dark p-3 h-100" key={product.id}>
                            <img className='card-img-top w-50 mx-auto' src={product.image} alt={product.title} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.title} </h5>
                                <h5 className='card-title'>${product.price}</h5>
                                <button className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    )
}

export default Main







