import { useState, useEffect } from 'react'
import React from 'react'
import './mains.css'
import SearchBar from '../searchBar/SearchBar'
import Spiner from '../spiner/Spiner'

function Main() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const productsStore = async () => {
    setLoading(true)
        const data = await fetch('https://fakestoreapi.com/products');
        const prom = await data.json();
        setProducts(prom)
        setLoading(false)
    }

    useEffect(() => {
        productsStore()
    }, [])

    console.log(products);

    return (
        <div className='container-fluid py-4'>
            <SearchBar />
            <div className='row gap-5 justify-content-center product-list'>
                <h2 className='text-center mt-3'>Categoria</h2>

                {loading ? (<Spiner/>) :  products.map((prod) => (
                    <div className="card col-lg-2 col-md-4 shadow align-items-center justify-content-center">
                        <div className="image-div d-flex align-items-center justify-content-center">
                            <img className='img-fluid h-100' src={prod.image} alt={prod.title} />
                        </div>
                        <div className="title-div d-flex align-items-center">
                            <h5 className='text-center text-justify '>{prod.title} </h5>
                        </div>
                        <div className="product-div">
                            <h5 className='text-primary border'>${prod.price}</h5>
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







