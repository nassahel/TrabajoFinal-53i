import React, { useState, useEffect } from 'react';
import './mains.css';
import Spiner from '../spiner/Spiner';
import { CardComidas } from '../card-product/CardProduct';
import { Link } from "react-router-dom";

function Main({ searchTerm, loading }) {
  // Aqui se almacenan los productos, inicializado con un arreglo vacío
    const [products, setProducts] = useState([]);

  // se agregan los nuevos productos
    const agregarNuevosProductos = (nuevosProductos) => {
    if (Array.isArray(nuevosProductos)) {
      // se combinan los productos existentes con los nuevos productos
        setProducts((prevProducts) => [...prevProducts, ...nuevosProductos]);
    } else {
        console.error("nuevosProductos no es un arreglo válido.");
    }
    };

    useEffect(() => {
    // Realiza una llamada a la API para obtener los datos de productos
    fetch('https://backend-rolling53i.onrender.com/api/menu')
      .then((response) => response.json()) // Convierte la respuesta a JSON
        .then((data) => {
        // Verifica si data.menues es un arreglo válido
        if (Array.isArray(data.menues)) {
            agregarNuevosProductos(data.menues);
        } else {
            console.error("Los datos de la API no son un arreglo válido.");
        }
        })
        .catch((error) => console.error(error));
    }, []);

  // Función para organizar productos en categorías
    const organizarProductosPorCategoria = () => {
    const categorias = {};
    products.forEach((product) => {
      // Normaliza la categoría a minúsculas para evitar duplicados
        const categoriaNormalizada = product.category.toLowerCase();
        if (!categorias[categoriaNormalizada]) {
        categorias[categoriaNormalizada] = [];
        }
        categorias[categoriaNormalizada].push(product);
    });
    return categorias;
    };

    const categorias = organizarProductosPorCategoria();

  // Combina los productos en un objeto
    const productosCombinados = Object.keys(categorias).map((categoria) => {
    return {
        categoria,
        productos: categorias[categoria],
    };
    });

    return (
    <div className='container-fluid pb-4'>
        <div className="container">
        {productosCombinados.map((categoria) => (
            <div key={categoria.categoria} className="green container-fluid col-xl-10 my-4 p-3 rounded">
            <h2 className='text-center mt-3 text-white display-1 py-3 sacramentoFont'>{categoria.categoria}</h2>
            {categoria.productos.length === 0 && !loading ? (
                <p className='p-2 text-center bg-light bg-opacity-75 col-lg-6 mx-auto rounded'>
                No se encontró ningún producto en esta categoría...
                </p>
            ) : (
                <div className='row row-cols-lg-4 row-cols-1 row-cols-md-2 g-5 mb-5'>
                {loading ? (
                    <Spiner />
                ) : (
                    categoria.productos.map((product) => (
                    <CardComidas
                        key={product._id}
                        product={product}
                        id={product._id}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        image={product.image}
                    />
                    ))
                )}
                </div>
            )}
            </div>
        ))}
        </div>
        <div className='container d-flex justify-content-center mt-3 col-lg-2 col-8 py-3 bg-secondary bg-opacity-25 rounded'>
        <Link to="/orders">
            <button style={{ backgroundColor: '#344235' }} className='px-5 py-3 rounded fw-bolder border border-light text-light' >Ver carrito</button>
        </Link>
        </div>
    </div>
    );
}

export default Main;












