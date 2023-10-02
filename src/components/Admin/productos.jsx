import { useEffect, useState } from 'react';
import Resultado from './resultado';

function Productos() {

  // Estados para manejar productos
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});

  // Estados para los campos del formulario
  const [idProducto, setidProduct] = useState()
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(false);


  const [editProduct, setEditProduct] = useState(false)

  let token = localStorage.getItem('token');

  //TRAER PRODUCTOS DEL BACKEND
  const productsStore = async () => {

    const data = await fetch('https://backend-rolling53i.onrender.com/api/menu');
    const prom = await data.json();
    setProductos(prom.menues);

  }

  useEffect(() => {
    productsStore();
  }, []);


  //AGREGAR PRODUCTOS AL BACKEND
  const agregarProductos = async () => {
    try {
      const newProduct = {
        name,
        detail,
        image,
        price: Number(price), // Convertir a número
        category,
        active
      };

      const url = 'https://backend-rolling53i.onrender.com/api/menu';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token, // Asegurarse de que token sea un objeto válido
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar el producto');
      }

      console.log('Producto agregado con éxito');
      productsStore(); // Actualizar la lista de productos
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR PRODUCTOS DEL BACKEND
  const datosEdicion = (id) => {
    const productoFind = productos.find((producto) => producto._id === id);
    console.log(id);
    console.log(productoFind);
    if (productoFind) {
      setidProduct(productoFind._id)
      setEditProduct(true)
      setName(productoFind.name)
      setDetail(productoFind.detail)
      setImage(productoFind.image)
      setPrice(productoFind.price)
      setCategory(productoFind.category)
      setActive(productoFind.active)
    }
  }

  const editarProducto = async () => {
    try {
      const updatedProduct = {
        name: name,
        detail: detail,
        image: image,
        price: price,
        category: category,
        active: active
      };

      const editIdProduct = idProducto

      const url = `https://backend-rolling53i.onrender.com/api/menu/${editIdProduct}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
        body: JSON.stringify(updatedProduct),
      });
      console.log("hola", updatedProduct);
      if (!response.ok) {
        throw new Error('No se pudo editar el producto');
      }

      console.log('Producto editado con éxito');
      productsStore(); // Actualizar la lista de usuarios
      setEditProduct(false)
    } catch (error) {
      console.error('Error al editar el Producto:', error);
    }
  };


  //ELIMINAR LOS PRODUCTOS DEL BACKEND
  const eliminarProducto = async (id) => {

    try {
      console.log("llegue");
      const url = `https://backend-rolling53i.onrender.com/api/menu`;
      const resp = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-token": token,
        },
      });

      const data = await resp.json();
      productsStore();
      return data;
    } catch (error) {

      return { msg: "No se conectó con backend" };
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!name || !detail || !image || !price || !category) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    if (editProduct) {
      // Editar un producto existente
      editarProducto()
    } else {
      // Agregar un nuevo producto
      agregarProductos()
    }

    // Limpiar los campos del formulario
    setName('');
    setDetail('');
    setImage('');
    setPrice('');
    setCategory('');
    setActive(false);
  };

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  const cargarProductos = () => {
    if (Object.keys(producto.length > 0)) {
      setName(producto.name)
      setDetail(producto.detail)
      setImage(producto.image)
      setPrice(producto.price)
      setActive(producto.active)
      setCategory(producto.category)
    } else {
      console.log('No hay nada en el array de tarea');
    }
  }


  return (
    <main>
      <form className="col-12 my-auto producto-contenedor bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className='row mt-4'>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="precio">Precio del Producto</label>
            <input
              className='input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="precio"
              id="precio"
              placeholder="Precio del Producto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="imagen">Link de Imagen</label>
            <input
              className='input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="imagen"
              id="imagen"
              placeholder="Imagen"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

        </div>

        <div className='row mt-lg-4 mt-2'>
          <div className='col-lg-4 text-center'>
            <label className='col-12 producto-texto fs-6' htmlFor="activo">Producto Activo</label>
            <select
              className='col-lg-6 col-3 input-productos p-1  input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              placeholder="Producto Activo"
              value={active}
              onChange={(e) => setActive(e.target.value === 'true')}
            >
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </div>



            <div className='col-lg-4 mt-2 text-center'>
              <label className='col-12 producto-texto fs-6' htmlFor="categoria">Categoría del Producto</label>
              <select
                className='col-lg-6 col-3 input-productos p-1 input-nombre rounded border border-black border-opacity-50'
                name="categoria"
                id="categoria"
                placeholder="Categoría del Producto"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Pizzas</option>
                <option>Entradas</option>
                <option>Carnes</option>
                <option>Bebidas</option>
                <option>Pastas</option>
              </select>
            </div>

         
            <div className='col-lg-4 mt-2 text-center'>
              <label className='col-12 producto-texto fs-6' htmlFor="descripcion">Descripción de Producto</label>
              <input
                className='mt-0 input-descripcion p-1 input-nombre rounded border border-black border-opacity-50'
                name="descripcion"
                type='text'
                id="descripcion"
                placeholder="Descripción"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
        </div>




          <div className='col-lg-4-md-12'>
            <div className='mt-2 text-center'>
              <input
                className="my-2 mb-3 btn btn-dark"
                type="submit"
                value={editProduct ? 'Editar Producto' : 'Agregar Producto'}
              />
            </div>
          </div>
      </form>

      <div className="resultado">
        <Resultado
          productos={productos}
          editarProducto={datosEdicion}
          eliminarProducto={eliminarProducto}
        />
      </div>
    </main>



  );
}

export default Productos;