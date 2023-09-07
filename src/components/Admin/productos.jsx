//import '../Admin/styles/productos.css'
import { useEffect, useState } from 'react'
import Resultado from './resultado';
import '../Admin/styles/productos.css'
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

  //ESTADO DE ERROR
  //const [error, setError] = useState(false)

  //LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('tareasRC', JSON.stringify(tareas))
  }, [tareas]);

  //GENERAMOS EL ID DINAMICO
  const generoIdDinamico = () => {
    const ran = Math.random()
    const fecha = Date.now()
    return ran + fecha
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([nombre, descripcion].includes('')) {
      console.log('El campo debe estar completo');
      return;
    }

    const objetoTareas = {
      nombre,
      descripcion,
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
  }

  return (
    <>
      <main className=''>
        <form className="producto-contenedor d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="nombre">Nombre de Producto</label>
            <input
              className='mb-2 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}

            />
          </div>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <label className='mb-2 text-center producto-texto' htmlFor="descripcion">Descripcion de Producto</label>
            <textarea
              className='mb-3 input-nombre rounded border border-black border-opacity-50'
              name="descripcion"
              id="descripcion"
              placeholder="Descripcion"
              value={descripcion}
              onChange={(e) => setdescripcion(e.target.value)}

            />
          </div>

          <input className='mb-2 btn btn-dark' type="submit" value='Agregar Producto' />
        </form>

        <div className="resultado">
          <Resultado
            tareas={tareas}
            setTarea={setTarea} />
        </div>
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