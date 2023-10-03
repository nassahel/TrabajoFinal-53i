import React from 'react'
import './mains.css'
import Spiner from '../spiner/Spiner'
import { useState } from 'react'
import { CardComidas } from '../card-product/CardProduct'


function Main({ products, searchTerm, loading }) {

    const [menuPedido, setMenuPedido] = useState([]);

    // Incremento de cantidad en el carrito

    const handleIncrement = (product) => {
        const productIndex = menuPedido.findIndex((item) => item._id === product._id);
        const updatedMenuPedido = [...menuPedido];

        if (productIndex !== -1) {
            updatedMenuPedido[productIndex].quantity += 1;
        } else {
            product.quantity = 1;
            updatedMenuPedido.push(product);
        }

        setMenuPedido(updatedMenuPedido);
        console.log(updatedMenuPedido);
    };

    // Disminucion de cantidad en el carrito

    const handleDecrement = (product) => {
        const productIndex = menuPedido.findIndex((item) => item._id === product._id);
        const updatedMenuPedido = [...menuPedido];

        if (productIndex !== -1) {
            if (updatedMenuPedido[productIndex].quantity > 1) {
                updatedMenuPedido[productIndex].quantity -= 1;
            } else {
                updatedMenuPedido.splice(productIndex, 1);
            }
        }

        setMenuPedido(updatedMenuPedido);
        console.log(updatedMenuPedido);
    };

    // Agregar al carrito

    const handleCartItems = (data) => {
        const dataArray = [data]
        console.log(dataArray);
        const dataString = JSON.stringify(data);
        localStorage.setItem("cart", dataString);
    }


    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const catEntrees = filteredProducts.filter((comi) => comi.category == 'Entradas')
    const catPizzas = filteredProducts.filter((comi) => comi.category == 'Pizzas')
    const catMeat = filteredProducts.filter((comi) => comi.category == 'Carnes')
    const catDrink = filteredProducts.filter((comi) => comi.category == 'Bebidas')

    return (
        <div className='container-fluid pb-4'>

            <div className="green container-fluid col-lg-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Entradas</h2>
                    {catEntrees.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catEntrees.map((product, index) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        agregarProducto={handleIncrement}
                                        eliminarProducto={handleDecrement}
                                        agregarCarrito={handleCartItems}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-lg-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Pizzas</h2>
                    {catPizzas.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catPizzas.map((product, index) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        agregarProducto={handleIncrement}
                                        eliminarProducto={handleDecrement}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-lg-10 my-4 p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Carnes</h2>
                    {catMeat.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catMeat.map((product, index) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        agregarProducto={handleIncrement}
                                        eliminarProducto={handleDecrement}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="green container-fluid col-lg-10  p-3 rounded">
                <div className="container">
                    <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>Bebidas</h2>
                    {catDrink.length === 0 && !loading ? (
                        <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>No se encontró nada en esta sección...</p>
                    ) : (
                        <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                            {loading ? (
                                <Spiner />
                            ) : (
                                catDrink.map((product, index) => (
                                    <CardComidas
                                        key={product._id}
                                        product={product}
                                        index={index}
                                        agregarProducto={handleIncrement}
                                        eliminarProducto={handleDecrement}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main







