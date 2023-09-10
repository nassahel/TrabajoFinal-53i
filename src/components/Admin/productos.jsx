//import '../Admin/styles/productos.css'
import { useEffect, useState } from 'react'
import Resultado from './resultado';
import '../Admin/styles/productos.css'
import AllProductos from './allProductos';
//import { AiOutlineCloseCircle } from "react-icons/ai"; //Paquete de iconos
//en esta componente tengo el texto y el icono del producto

function Productos() {

  //LOCAL STORAGE
  const tareasLS = JSON.parse(localStorage.getItem('tareasRC')) ?? [];

  const [tareas, setTareas] = useState(tareasLS)
  const [tarea, setTarea] = useState({})

  // VALORES DEL FORM 
  const [nombre, setNombre] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [imagen, setimagen] = useState('');
  const [precio, setprecio] = useState('');
  const [activo, setActivo] = useState('')
  //ESTADO DE ERROR
  //const [error, setError] = useState(false)

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

  return (
    <>
      <main>
        <form className="producto-contenedor d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='w-100 p-1 mb-2 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="nombre">Link de Imagen</label>
            <input
              className='p-1 mb-2 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="imagen"
              id="imagen"
              placeholder="Imagen"
              value={imagen}
              onChange={(e) => setimagen(e.target.value)}
            />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="nombre">Precio del Producto</label>
            <input
              className='p-1 mb-2 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="precio"
              id="precio"
              placeholder="Precio del Producto"
              value={precio}
              onChange={(e) => setprecio(e.target.value)}
            />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="descripcion">Producto Activo</label>
            <input
              className='p-1 mb-2 w-100 mb-3 input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              placeholder="Producto Activo"
              value={activo}
              onChange={(e) => setActivo(e.target.value)}
            />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="descripcion">Descripcion de Producto</label>
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
        <AllProductos
          tareas={tareas}
          setTarea={setTarea}
          eliminandoTarea={eliminandoTarea} />
      </main>
    </>
  )
}

export default Productos


/* function Productos({ texto, id, eliminarProducto }) {
  return(
    <div className="producto-contenedor">
      <div className="producto-texto">
        {texto}
      </div>
      <div className="producto-iconos-contenedor" onClick={eliminarProducto(id)} >
        <AiOutlineCloseCircle  className="producto-icono" />
      </div>
    </div>
  );
}

export default Productos */