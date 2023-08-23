import React from 'react'
import { useState, useEffect } from 'react'




function MostWanted() {

  const [products, setProducts] = useState()

  const productsStore = async () => {
   
      const data = await fetch('https://fakestoreapi.com/products');
      const products = await data.json();
      setProducts(products)
  }

  useEffect(() => {
    productsStore()
  }, [])
  
  console.log(products);
  
  return (
    <div>
      { !products ? 'Cargando...' : 
      products.map((prod, index)=>{
        return  `<img src="${prod.image}" alt="" />`
      })}
      


    </div>
  )
}

export default MostWanted