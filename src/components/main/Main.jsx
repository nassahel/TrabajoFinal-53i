import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'
import { useNavigate } from 'react-router'


function Main({ products, searchTerm, loading }) {

    const navigate = useNavigate()

    const filteredProducts = products.filter((product) =>      
        product.name.toLowerCase().includes(searchTerm.toLowerCase())) 

      const catEntradas = filteredProducts.filter((comi) => comi.category == 'Entradas' )
      const catPizzas = filteredProducts.filter((comi) => comi.category == 'Pizzas' )
      const catCarnes = filteredProducts.filter((comi) => comi.category == 'Carnes' )
      const catBebidas = filteredProducts.filter((comi) => comi.category == 'Bebidas' )

    return (
        <div className='container'>
            <h2 className='text-center mt-3 bg-warning py-3'>Entradas</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catEntradas.map((product, index) => (

                    <div className="col col-lg-3" key={product.id || index}>
                        <div className="card text-center border-2 border-dark p-1 h-100"  >
                            <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.name}</h5>
                                <h5 className='card-title'>${product.price}</h5>
                                <button 
                                onClick={()=> navigate("/user/orders", { state: product })}
                                className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Pizzas</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catPizzas.map((product, index) => (
                    <div className="col col-lg-3" key={product.id || index}>
                        <div className="card text-center border-2 border-dark p-1 h-100" >
                            <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.name} </h5>
                                <h5 className='card-title'>${product.price}</h5>
                                <button 
                                onClick={()=> navigate("/user/orders", { state: product })}
                                className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Carnes</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catCarnes.map((product, index) => (

                    <div className="col col-lg-3" key={product.id || index}>
                        <div className="card text-center border-2 border-dark p-1 h-100" >
                            <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.name} </h5>
                                <h5 className='card-title'>${product.price}</h5>
                                <button 
                                onClick={()=> navigate("/user/orders", { state: product })}
                                className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Bebidas</h2>

            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catBebidas.map((product, index) => (

                    <div className="col col-lg-3" key={product.id || index}>
                        <div className="card text-center border-2 border-dark p-1 h-100" >
                            <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.name} </h5>
                                <h5 className='card-title'>${product.price}</h5>
                                <button 
                                onClick={()=> navigate("/user/carrito", { state: product })}
                                className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main







