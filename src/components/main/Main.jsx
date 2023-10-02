import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'
import { useNavigate } from 'react-router'


function Main({ products, searchTerm, loading }) {

    const navigate = useNavigate()

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const catEntrees = filteredProducts.filter((comi) => comi.category == 'Entradas')
    const catPizzas = filteredProducts.filter((comi) => comi.category == 'Pizzas')
    const catMeat = filteredProducts.filter((comi) => comi.category == 'Carnes')
    const catDrink = filteredProducts.filter((comi) => comi.category == 'Bebidas')

    return (
        <div className='container-fluid'>

            <div className="green container-fluid col-10 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Entradas</h2>
                    {catEntrees.length === 0 && !loading ? (
                        <p className='p-3 bg-light bg-opacity-75 rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catEntrees.map((product, index) => (
                                    <div className="col col-lg-3" key={product.id || index}>
                                        <div className="card text-center border-1 border-dark p-1 h-100">
                                            <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                                            <div className="card-body d-flex flex-column justify-content-end">
                                                <h5 className='card-title'>{product.name}</h5>
                                                <h5 className='card-title'>${product.price}</h5>
                                                <button
                                                    onClick={() => navigate("/user/orders", { state: product })}
                                                    className='btn btn-outline-success text-dark border-2 rounded-0 fw-bold'>Agregar al carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>


            </div>

            <h2 className='text-center mt-3  py-3 green text-white sacramentoFont'>Pizzas</h2>
            {catPizzas.length === 0 && !loading ? (
                <p className='p-3 bg-light bg-opacity-75 rounded'>No se encontró nada en esta sección...</p>
            ) : (
                <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                    {loading ? (
                        <Spiner />
                    ) : (
                        catPizzas.map((product, index) => (
                            <div className="col col-lg-3" key={product.id || index}>
                                <div className="card text-center border-1 border-dark p-1 h-100">
                                    <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                                    <div className="card-body d-flex flex-column justify-content-end">
                                        <h5 className='card-title'>{product.name}</h5>
                                        <h5 className='card-title'>${product.price}</h5>
                                        <button
                                            onClick={() => navigate("/user/orders", { state: product })}
                                            className='btn btn-outline-success text-dark border-2 rounded-0 fw-bold'>Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <h2 className='text-center mt-3 py-3 text-white sacramentoFont'>Carnes</h2>
            {catMeat.length === 0 && !loading ? (
                <p className='p-3 bg-light bg-opacity-75 rounded green'>No se encontró nada en esta sección...</p>
            ) : (
                <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                    {loading ? (
                        <Spiner />
                    ) : (
                        catMeat.map((product, index) => (
                            <div className="col col-lg-3" key={product.id || index}>
                                <div className="card text-center border-1 border-dark p-1 h-100">
                                    <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                                    <div className="card-body d-flex flex-column justify-content-end">
                                        <h5 className='card-title'>{product.name}</h5>
                                        <h5 className='card-title'>${product.price}</h5>
                                        <button
                                            onClick={() => navigate("/user/orders", { state: product })}
                                            className='btn btn-outline-success text-dark border-2 rounded-0 fw-bold'>Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <h2 className='text-center mt-3  py-3 green text-white sacramentoFont'>Bebidas</h2>
            {catDrink.length === 0 && !loading ? (
                <p className='p-3 bg-light bg-opacity-75 rounded'>No se encontró nada en esta sección...</p>
            ) : (
                <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 my-5'>
                    {loading ? (
                        <Spiner />
                    ) : (
                        catDrink.map((product, index) => (
                            <div className="col col-lg-3" key={product.id || index}>
                                <div className="card text-center border-1 border-dark p-1 h-100">
                                    <img className='img-fluid mx-auto' src={product.image} alt={product.name} />
                                    <div className="card-body d-flex flex-column justify-content-end">
                                        <h5 className='card-title'>{product.name}</h5>
                                        <h5 className='card-title'>${product.price}</h5>
                                        <button
                                            onClick={() => navigate("/user/orders", { state: product })}
                                            className='btn btn-outline-success text-dark border-2 rounded-0 fw-bold'>Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}





        </div>
    )
}

export default Main







