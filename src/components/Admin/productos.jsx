import { useEffect, useState } from 'react';
import Resultado from './resultado';
import '../Admin/styles/productos.css';

function Productos() {
  // Definir los productos iniciales de la base de datos
  /*   const productosBd = [
      {
        id: 0,
        name: 'Pollo con Papas',
        detail: 'Pollo con papas noisette',
        image: 'https://i.pinimg.com/564x/f7/e0/12/f7e01237dad015937aedb9e3f358ceb1.jpg',
        price: 2100,
        active: true,
        category: 'Entradas'
      },
      {
        id: 1,
        name: 'Pizza Margarita',
        detail: 'Pizza margarita con aceitunas verdes, ocho porciones',
        image: 'https://i.pinimg.com/564x/82/92/9c/82929cc929136c3cf1bdf7d8faa7662a.jpg',
        price: 2400,
        active: true,
        category: 'Pizzas'
      },
      {
        id: 2,
        name: 'Milanesa Napolitana',
        detail: 'Milanesa napolitana con porcion de papas fritas',
        image: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
        price: 2000,
        active: true,
        category: 'Entradas'
      },
      {
        id: 3,
        name: 'Sandwich de ternera',
        detail: 'Sandwich de ternera y queso con tomate',
        image: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
        price: 1300,
        active: true,
        category: 'Entradas'
      }
    ]; */


  // Estados para manejar productos
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});

  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(false);

  let token = localStorage.getItem('token');

  //TRAER PRODUCTOS DEL BACKEND
  const productsStore = async () => {

    const data = await fetch('https://backend-rolling53i.onrender.com/api/menu');
    const prom = await data.json();
    console.log(prom);
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
        throw new Error('No se pudo agregar el usuario');
      }

      console.log('Producto agregado con éxito');
      productsStore(); // Actualizar la lista de productos
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR PRODUCTOS DEL BACKEND

  const editarProducto = async () => {
    try {
      const updatedProduct = {
        _id: productos.id, // Usar el ID del usuario que se está editando
        name,
        detail,
        image,
        price,
        category,
        active
      };

      const url = `https://backend-rolling53i.onrender.com/api/menu`; // Incluir el ID en la URL
      const response = await fetch(url + "/" + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('No se pudo editar el usuario');
      }

      console.log('Usuario editado con éxito');
      productsStore(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };


  //ELIMINAR LOS PRODUCTOS DEL BACKEND
/*   const eliminarProducto = async (id) => {
    try {
      const url = `https://backend-rolling53i.onrender.com/api/menu`;
      const resp = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-token": token,
        },
      });
  
      const data = await resp.json();
  
      return data;
    } catch (error) {
      console.log(error);
      return { msg: "No se conectó con backend" };
    }
  };

  
  useEffect(() => {
    eliminarProducto();
  }, []); */

  


  // Función para agregar o editar productos
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!name || !detail || !image || !price || !category) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    // Crear un nuevo producto

    if (producto.id) {
      // Editar un producto existente
      editarProducto()
      /* const updatedProducts = productos.map((p) => (p.id === producto.id ? { ...newProduct, id: p.id } : p));
      setProductos(updatedProducts);
      setProducto({}); */
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

  // Función para eliminar un producto
  /*   const eliminandoProducto = (id) => {
      const updatedProducts = productos.filter((p) => p.id !== id);
      setProductos(updatedProducts);
    }; */

  // Efecto para guardar y cargar productos en el localStorage
  /*   useEffect(() => {
      // Cargar productos desde el localStorage al montar el componente
      const productosGuardados = JSON.parse(localStorage.getItem('productos'));
  
      if (productosGuardados) {
        setProductos(productosGuardados);
      } else {
        // Si no hay productos en el localStorage, establecer los productos iniciales de la base de datos
        setProductos(productos);
      }
    }, []); */

  /*   useEffect(() => {
      // Guardar productos en el localStorage cuando cambien
      localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]); */

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
   useEffect(() => {
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
    }, [producto])

  // Función para generar un ID dinámico
  const generoIdDinamico = () => {
    const ran = Math.random();
    const fecha = Date.now();
    return ran + fecha;
  };

  return (
    <main>
      <form className="producto-contenedor d-flex flex-column align-items-center" onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="precio">Precio del Producto</label>
              <input
                className='input-productos p-1 w-75 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="precio"
                id="precio"
                placeholder="Precio del Producto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="imagen">Link de Imagen</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="imagen"
                id="imagen"
                placeholder="Imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="activo">Producto Activo</label>
              <select
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
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
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="categoria">Categoría del Producto</label>
              <select
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
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
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="descripcion">Descripción de Producto</label>
              <textarea
                className='mt-0 input-descripcion w-75 input-nombre rounded border border-black border-opacity-50'
                name="descripcion"
                id="descripcion"
                placeholder="Descripción"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className=' text-center'>
              <input
                className="mt-3 mb-5 btn btn-dark"
                type="submit"
                value={producto.id ? 'Editar Producto' : 'Agregar Producto'}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="resultado">
        <Resultado
          productos={productos}
          setProducto={setProducto}
          //eliminarProducto={eliminarProducto}
        />
      </div>
    </main>



  );
}

export default Productos;