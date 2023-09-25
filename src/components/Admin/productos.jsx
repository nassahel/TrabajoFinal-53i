import { useEffect, useState } from 'react';
import Resultado from './resultado';
import '../Admin/styles/productos.css';

function Productos() {
  // Definir los productos iniciales de la base de datos
  const productosBd = [
    {
      id: 0,
      productName: 'Pollo con Papas',
      productDetail: 'Pollo con papas noisette',
      productImage: 'https://i.pinimg.com/564x/f7/e0/12/f7e01237dad015937aedb9e3f358ceb1.jpg',
      productPrice: 2100,
      activeProduct: true,
    },
    {
      id: 1,
      productName: 'Pizza Margarita',
      productDetail: 'Pizza margarita con aceitunas verdes, ocho porciones',
      productImage: 'https://i.pinimg.com/564x/82/92/9c/82929cc929136c3cf1bdf7d8faa7662a.jpg',
      productPrice: 2400,
      activeProduct: true,
    },
    {
      id: 2,
      productName: 'Milanesa Napolitana',
      productDetail: 'Milanesa napolitana con porcion de papas fritas',
      productImage: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
      productPrice: 2000,
      activeProduct: true,
    },
    {
      id: 3,
      productName: 'Sandwich de ternera',
      productDetail: 'Sandwich de ternera y queso con tomate',
      productImage: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
      productPrice: 1300,
      activeProduct: true,
    }
  ];

  // Estados para manejar productos
  const [productos, setProductos] = useState(productosBd);
  const [producto, setProducto] = useState({});

  // Estados para los campos del formulario
  const [productName, setProductName] = useState('');
  const [productDetail, setProductDetail] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [activeProduct, setActiveProduct] = useState('');

  // Función para agregar o editar productos
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!productName || !productDetail || !productImage || !productPrice || !activeProduct) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    // Crear un nuevo producto
    const newProduct = {
      productName,
      productDetail,
      productImage,
      productPrice: Number(productPrice), // Convertir a número
      activeProduct: Boolean(activeProduct), // Convertir a booleano
    };

    if (producto.id) {
      // Editar un producto existente
      const updatedProducts = productos.map((p) => (p.id === producto.id ? { ...newProduct, id: p.id } : p));
      setProductos(updatedProducts);
      setProducto({});
    } else {
      // Agregar un nuevo producto
      newProduct.id = generoIdDinamico();
      setProductos([...productos, newProduct]);
    }

    // Limpiar los campos del formulario
    setProductName('');
    setProductDetail('');
    setProductImage('');
    setProductPrice('');
    setActiveProduct('');
  };

  // Función para eliminar un producto
  const eliminandoProducto = (id) => {
    const updatedProducts = productos.filter((p) => p.id !== id);
    setProductos(updatedProducts);
  };

  // Efecto para guardar y cargar productos en el localStorage
  useEffect(() => {
    // Cargar productos desde el localStorage al montar el componente
    const productosGuardados = JSON.parse(localStorage.getItem('productos'));

    if (productosGuardados) {
      setProductos(productosGuardados);
    } else {
      // Si no hay productos en el localStorage, establecer los productos iniciales de la base de datos
      setProductos(productosBd);
    }
  }, []);

  useEffect(() => {
    // Guardar productos en el localStorage cuando cambien
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

    //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
    useEffect(() => {
      if (Object.keys(producto.length > 0)) {
        setProductName(producto.productName)
        setProductDetail(producto.productDetail)
        setProductImage(producto.productImage)
        setProductPrice(producto.productPrice)
        setActiveProduct(producto.activeProduct)
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
        <div className=' mt-3 d-flex justify-content-center align-items-center'>
          <label className='text-center producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="nombre">Link de Imagen</label>
          <input
            className='input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="imagen"
            id="imagen"
            placeholder="Imagen"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <div className='mt-3 d-flex justify-content-center align-items-center'>
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="nombre">Precio del Producto</label>
          <input
            className=' input-productos p-1 w-75 input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="precio"
            id="precio"
            placeholder="Precio del Producto"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="descripcion">Producto Activo</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            name="activo"
            id="activo"
            placeholder="Producto Activo"
            value={activeProduct}
            onChange={(e) => setActiveProduct(e.target.value)}
          />
        </div>
        <div className='mt-3 d-flex flex-column justify-content-center align-items-center'>
          <label className='text-center producto-texto fs-6' htmlFor="descripcion">Descripcion de Producto</label>
          <textarea
            className='mt-0 input-descripcion w-100 p-2 mb-3 input-nombre rounded border border-black border-opacity-50'
            name="descripcion"
            id="descripcion"
            placeholder="Descripcion"
            value={productDetail}
            onChange={(e) => setProductDetail(e.target.value)}
          />
        </div>
        <input
          className="mb-5 btn btn-dark"
          type="submit"
          value={producto.id ? 'Editar Producto' : 'Agregar Producto'}
        />
      </form>

      <div className="resultado">
        <Resultado
          productos={productos}
          setProducto={setProducto}
          eliminandoProducto={eliminandoProducto}
        />
      </div>
    </main>
  );
}

export default Productos;


/* import { useEffect, useState } from 'react'
import Resultado from './resultado';
import '../Admin/styles/productos.css'

function Productos() {

  //DEFINO LOS PRODUCTOS 
  const productosBd = [
    {
      id: 0,
      productName: 'Pollo con Papas',
      productDetail: 'Pollo con papas noisette',
      productImage: 'https://i.pinimg.com/564x/f7/e0/12/f7e01237dad015937aedb9e3f358ceb1.jpg',
      productPrice: 2100,
      activeProduct: true,
    },
    {
      id: 1,
      productName: 'Pizza Margarita',
      productDetail: 'Pizza margarita con aceitunas verdes, ocho porciones',
      productImage: 'https://i.pinimg.com/564x/82/92/9c/82929cc929136c3cf1bdf7d8faa7662a.jpg',
      productPrice: 2400,
      activeProduct: true,
    },
    {
      id: 2,
      productName: 'Milanesa Napolitana',
      productDetail: 'Milanesa napolitana con porcion de papas fritas',
      productImage: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
      productPrice: 2000,
      activeProduct: true,
    },
    {
      id: 3,
      productName: 'Sandwich de ternera',
      productDetail: 'Sandwich de ternera y queso con tomate',
      productImage: 'https://i.pinimg.com/564x/c4/0e/0e/c40e0ec7c86a6a5eeee14c23b31da79c.jpg',
      productPrice: 1300,
      activeProduct: true,
    }
  ]

  //LOCAL STORAGE
  const productosApi = JSON.parse(localStorage.getItem('productosApi'));
  const productosLS = JSON.parse(localStorage.getItem('productosRC')) ?? [];

  //ESTADO DE PRODUCTO EXISTENTE
  const [productExist, setProductExist] = useState(productosBd)
  const [productsExist, setProductsExist] = useState(productosApi)


  const [productos, setProductos] = useState(productosLS)
  const [producto, setProducto] = useState({})

  // VALORES DEL FORM 
  const [productName, setProductName] = useState(''); //NOMBRE
  const [productDetail, setProductDetail] = useState('');//DESCRIPCION
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState(Number);
  const [activeProduct, setActiveProduct] = useState(Boolean);

  //LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('productosApi', JSON.stringify(productExist))
    localStorage.setItem('productosRC', JSON.stringify(productos))
  }, [productos, productsExist]);

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  useEffect(() => {
    if (Object.keys(producto.length > 0)) {
      setProductName(producto.productName)
      setProductDetail(producto.productDetail)
      setProductImage(producto.productImage)
      setProductPrice(producto.productPrice)
      setActiveProduct(producto.activeProduct)
    } else {
      console.log('No hay nada en el array de tarea');
    }
  }, [producto])


  //GENERAMOS EL ID DINAMICO
  const generoIdDinamico = () => {
    const ran = Math.random()
    const fecha = Date.now()
    return ran + fecha
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([productName, productDetail, productImage, productPrice, activeProduct].includes('')) {
      console.log('El campo debe estar completo');
      return;
    }

    const objetoProductos = {
      productName,
      productDetail,
      productImage,
      productPrice,
      activeProduct
    }

    if (producto.id) {
      //EDITAMOS LA TAREA 
      objetoProductos.id = producto.id

      const productosActualizados = productos.map((productosState) => {
        return productosState.id === producto.id ? objetoProductos : productosState
      })

      setProductos(productosActualizados)
      setProducto({})

    } else {
      //CREAMOS LA TAREA NUEVA
      console.log('tarea nueva');
      objetoProductos.id = generoIdDinamico()
      setProductos([...productos, objetoProductos])
    }

    //PARA NO TENER QUE BORRAR EL INPUT A MANO SE REINICIA SOLO
    setProductName('')
    setProductImage('')
    setProductPrice('')
    setActiveProduct('')
    setProductDetail('')
  }

  //PARA ELIMINAR LA TAREA
  const eliminandoProducto = (id) => {
    const productoActualizados = productos.filter((productosState) => productosState.id !== id)
    setProductos(productoActualizados)
  }

  const eliminandoProductoExistente = (id) => {
    const productExistActualizados = productsExist.filter((productsExistState) => productsExistState.id !== id)
    setProductsExist(productExistActualizados)
  }


  return (
    <>
      <main>
        <form className="producto-contenedor d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className=' mt-3 d-flex justify-content-center align-items-center'>
            <label className='text-start producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label className=' text-center producto-texto fs-6' htmlFor="nombre">Link de Imagen</label>
            <input
              className='input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="imagen"
              id="imagen"
              placeholder="Imagen"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </div>
          <div className=' d-flex justify-content-center align-items-center'>
            <label className='text-center producto-texto fs-6' htmlFor="nombre">Precio del Producto</label>
            <input
              className=' input-productos w-75 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="precio"
              id="precio"
              placeholder="Precio del Producto"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <label className='text-center producto-texto fs-6' htmlFor="descripcion">Producto Activo</label>
            <input
              className='input-productos w-75 input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              placeholder="Producto Activo"
              value={activeProduct}
              onChange={(e) => setActiveProduct(e.target.value)}
            />
          </div>
          <div className='mt-3 d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto fs-6' htmlFor="descripcion">Descripcion de Producto</label>
            <textarea
              className='w-100 mb-3 input-nombre rounded border border-black border-opacity-50'
              name="descripcion"
              id="descripcion"
              placeholder="Descripcion"
              value={productDetail}
              onChange={(e) => setProductDetail(e.target.value)}
            />
          </div>

          <input
            className='mb-2 btn btn-dark'
            type="submit"
            value={producto.id ? 'Editar Producto' : 'Agregar Producto'}
          />
        </form>

        <div className="resultado">
          <Resultado
            productos={productos}
            setProducto={setProducto}
            eliminandoProducto={eliminandoProducto}
            eliminandoProductoExistente={eliminandoProductoExistente}
          />
        </div>
      </main>
    </>
  )
}

export default Productos */

