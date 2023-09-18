import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import './searchBar.css'

const URL = 'https://fakestoreapi.com/products';

function SearchBar() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container-fluid flex-column d-flex justify-content-center align-items-center'>
      <Form className="containter-fluid d-flex col-lg-5 col-12 my-4">
        <Form.Control onChange={(e) => setSearch(e.target.value)} value={search}
          type="search"
          placeholder="Buscar..."
          className="me-2 form-control-lg"
          aria-label="Search"
          data-bs-theme="light"
        />
        <Button className='bg-dark btn btn-md' onClick={handleSearch} variant="outline-light"><BsSearch size='2rem' /></Button>
      </Form>

      <div className='container-fluid d-flex gap-3 flex-wrap'>
        {filteredProducts.map((prod) => (


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

        ))}
      </div>
    </div>
  )
}

export default SearchBar;
