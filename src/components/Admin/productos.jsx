import { useEffect, useState } from 'react'
import Resultado from './resultado';
import '../Admin/styles/productos.css'

function Productos() {

  //LOCAL STORAGE
  const tareasLS = JSON.parse(localStorage.getItem('tareasRC')) ?? [];

  const [tareas, setTareas] = useState(tareasLS)
  const [tarea, setTarea] = useState({})

  // VALORES DEL FORM 
  const [nombre, setNombre] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [imagen, setimagen] = useState('');
  const [precio, setprecio] = useState(Number);
  const [activo, setActivo] = useState(Boolean);

  //LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('tareasRC', JSON.stringify(tareas))
  }, [tareas]);

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  useEffect(() => {
    if (Object.keys(tarea.length > 0)) {
      setNombre(tarea.nombre)
      setdescripcion(tarea.descripcion)
      setimagen(tarea.imagen)
      setprecio(tarea.precio)
      setActivo(tarea.activo)
    } else {
      console.log('No hay nada en el array de tarea');
    }
  }, [tarea])

  //GENERAMOS EL ID DINAMICO
  const generoIdDinamico = () => {
    const ran = Math.random()
    const fecha = Date.now()
    return ran + fecha
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([nombre, descripcion, imagen, precio, activo].includes('')) {
      console.log('El campo debe estar completo');
      return;
    }

    const objetoTareas = {
      nombre,
      descripcion,
      imagen,
      precio,
      activo
    }

    if (tarea.id) {
      //EDITAMOS LA TAREA 
      objetoTareas.id = tarea.id

      const tareasActualizados = tareas.map((tareasState) => {
        return tareasState.id === tarea.id ? objetoTareas : tareasState
      })

      setTareas(tareasActualizados)
      setTarea({})

    } else {
      //CREAMOS LA TAREA NUEVA
      console.log('tarea nueva');
      objetoTareas.id = generoIdDinamico()
      setTareas([...tareas, objetoTareas])
    }

    //PARA NO TENER QUE BORRAR EL INPUT A MANO SE REINICIA SOLO
    setNombre('')
    setimagen('')
    setprecio('')
    setActivo('')
    setdescripcion('')
  }

  //PARA ELIMINAR LA TAREA
  const eliminandoTarea = (id) => {
    const tareasActualizadas = tareas.filter((tareasState) => tareasState.id !== id)
    setTareas(tareasActualizadas)
  }

  //RECORRIDO DE LA API
  const [productos, setProductos] = useState([])

  const productList = async () => {
    const data = await fetch('https://fakestoreapi.com/products')
    const products = await data.json()
    setProductos(products)

  }

  useEffect(() => {
    productList()
  }, []) // Para que se renderice una sola vez

  return (
    <>
      <main>
        <form className="producto-contenedor d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className='me-3 mt-3 d-flex justify-content-center align-items-center'>
            <label className='ps-3 text-start producto-texto fs-6' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label className='ps-3 text-center producto-texto fs-6' htmlFor="nombre">Link de Imagen</label>
            <input
              className='input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="imagen"
              id="imagen"
              placeholder="Imagen"
              value={imagen}
              onChange={(e) => setimagen(e.target.value)}
            />
          </div>
          <div className='me-3 mt-3 d-flex justify-content-center align-items-center'>
            <label className='ps-3 text-center producto-texto fs-6' htmlFor="nombre">Precio del Producto</label>
            <input
              className=' input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="precio"
              id="precio"
              placeholder="Precio del Producto"
              value={precio}
              onChange={(e) => setprecio(e.target.value)}
            />
            <label className='ps-3 text-center producto-texto fs-6' htmlFor="descripcion">Producto Activo</label>
            <input
              className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              placeholder="Producto Activo"
              value={activo}
              onChange={(e) => setActivo(e.target.value)}
            />
          </div>
          <div className='mt-3 d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto fs-6' htmlFor="descripcion">Descripcion de Producto</label>
            <textarea
              className='w-100 mb-3 input-nombre rounded border border-black border-opacity-50'
              name="descripcion"
              id="descripcion"
              placeholder="Descripcion"
              value={descripcion}
              onChange={(e) => setdescripcion(e.target.value)}
            />
          </div>

          <input
            className='mb-2 btn btn-dark'
            type="submit"
            value={tarea.id ? 'Editar Producto' : 'Agregar Producto'}
          />
        </form>

        <div className="resultado">
          <Resultado
            tareas={tareas}
            setTarea={setTarea}
            eliminandoTarea={eliminandoTarea} />
        </div>
      </main>
    </>
  )
}

export default Productos