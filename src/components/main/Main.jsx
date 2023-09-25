import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'
import comidas from './comidas'

function Main({ products, searchTerm, loading }) {

    const filteredProducts = products.filter((product) =>        //cuando tenga la api abajo en vez de comidas tengo que poner la variable esta
        product.title.toLowerCase().includes(searchTerm.toLowerCase())) 



      const catEntradas = comidas.filter((comi) => comi.categoria == 'Entradas' )
      const catPizzas = comidas.filter((comi) => comi.categoria == 'Pizzas' )
      const catCarnes = comidas.filter((comi) => comi.categoria == 'Carnes' )
      const catBebidas = comidas.filter((comi) => comi.categoria == 'Bebidas' )


    return (
        <div className='container'>
            <h2 className='text-center mt-3 bg-warning py-3'>Entradas</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catEntradas.map((product) => (

                    <div className="col col-lg-3">
                        <div className="card text-center border-2 border-dark p-1 h-100" key={product.id}>
                            <img className='img-fluid mx-auto' src={product.imagen} alt={product.nombre} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.nombre} </h5>
                                <h5 className='card-title'>${product.precio}</h5>
                                <button className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>


                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Pizzas</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catPizzas.map((product) => (

                    <div className="col col-lg-3">
                        <div className="card text-center border-2 border-dark p-1 h-100" key={product.id}>
                            <img className='img-fluid mx-auto' src={product.imagen} alt={product.nombre} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.nombre} </h5>
                                <h5 className='card-title'>${product.precio}</h5>
                                <button className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>


                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Carnes</h2>
            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catCarnes.map((product) => (

                    <div className="col col-lg-3">
                        <div className="card text-center border-2 border-dark p-1 h-100" key={product.id}>
                            <img className='img-fluid mx-auto' src={product.imagen} alt={product.nombre} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.nombre} </h5>
                                <h5 className='card-title'>${product.precio}</h5>
                                <button className='btn btn-outline-warning rounded-0 fw-bold'>Comprar</button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            <h2 className='text-center mt-3 bg-warning py-3'>Bebidas</h2>

            <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                {loading ? <Spiner /> : catBebidas.map((product) => (

                    <div className="col col-lg-3">
                        <div className="card text-center border-2 border-dark p-1 h-100" key={product.id}>
                            <img className='img-fluid mx-auto' src={product.imagen} alt={product.nombre} />
                            <div className="card-body d-flex flex-column justify-content-end">
                                <h5 className='card-title'>{product.nombre} </h5>
                                <h5 className='card-title'>${product.precio}</h5>
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







