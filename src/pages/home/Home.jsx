import React from 'react'
import { useState, useEffect } from 'react'
import Main from '../../components/main/Main'
import SearchBar from '../../components/search-bar/SearchBar'


function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productsStore = async () => {
    setLoading(true);
    const data = await fetch('https://backend-rolling53i.onrender.com/api/menu');
    const prom = await data.json();
    setProducts(prom.menues);
    setLoading(false);
  }

  useEffect(() => {
    productsStore();
  }, []);

  return (
    <div className='container-fluid home'>
      <SearchBar setSearchTerm={setSearchTerm} />
      <Main loading={loading} products={products} searchTerm={searchTerm}/>

    </div>
  )
}

export default Home