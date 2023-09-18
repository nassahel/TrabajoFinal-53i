import { useState, useEffect } from 'react'
import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'

function Main({ products, searchTerm, loading }) {

    
    const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()))



    return (
        <div className='container-fluid py-4'>
            <div className='row gap-5 justify-content-center product-list'>
                <h2 className='text-center mt-3 text-light'>Productos</h2>

                { loading ? <Spiner/> : filteredProducts.map((product) => (
                    <div className="card col-lg-2 col-md-4 shadow align-items-center justify-content-center" key={product.id}>
                        <div className="image-div d-flex align-items-center justify-content-center">
                            <img className='img-fluid h-100' src={product.image} alt={product.title} />
                        </div>
                        <div className="title-div d-flex align-items-center">
                            <h5 className='text-center text-justify '>{product.title} </h5>
                        </div>
                        <div className="product-div">
                            <h5 className='text-primary border'>${product.price}</h5>
                        </div>
                        <div className="button-div">
                            <button className='btn btn-outline-warning fw-bold'>Comprar</button>
                        </div>

                    </div>
                )) }

            </div>
        </div>
    )
}

export default Main







