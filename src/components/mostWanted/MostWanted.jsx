import React from 'react'
import { useState, useEffect } from 'react'
import './mostWanted.css'




function MostWanted() {

  const [products, setProducts] = useState([])

  const productsStore = async () => {
      const data = await fetch('https://fakestoreapi.com/products');
      const prom = await data.json();
      setProducts(prom)
  }

  useEffect(() => {
    productsStore()
  }, [])
  
  console.log(products);

  return (
    <div className='row gap-5 justify-content-center'>
     {products.map((prod) => (
     <div className="card col-lg-2 col-md-4 shadow align-items-center justify-content-center p-4">
       <img  className='img-fluid' src={prod.image} alt={prod.title} />
       <h3 className='text-center mt-2'>{prod.title}</h3>
       <h4 className='text-primary border py-2 px-4 mt-4'>${prod.price}</h4>
       <button className='btn btn-outline-warning mt-4 fw-bold'>Comprar</button>

     </div>
     ))}
    </div>
  )
}

export default MostWanted