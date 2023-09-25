import React from 'react'
import { useState, useEffect } from 'react'
import Main from '../../components/main/Main'
import SearchBar from '../../components/searchBar/SearchBar'



function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productsStore = async () => {
    setLoading(true);
    const data = await fetch('https://fakestoreapi.com/products');
    const prom = await data.json();
    setProducts(prom);
    setLoading(false);
    console.log(prom)
  }


  useEffect(() => {
    productsStore();
  }, []);


  return (
    <div className='container-fluid home'>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Main loading={loading} products={products} searchTerm={searchTerm} />

    </div>
  )
}

export default Home