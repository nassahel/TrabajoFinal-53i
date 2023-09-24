import AllProductos from './allProductos'
import './styles/resultado.css'
const Resultado = ({ tareas, setTarea, eliminandoTarea }) => {

  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el producto?')
    if (respuesta) {
      eliminandoTarea(id)
    }
  }


  return (
    <div>
      {tareas && tareas.length ? (
        <>
          {tareas.map((tarea, index) => (
            <div key={index} className="contenedor-agregados agregados-texto">
              <div>
                <p> <span className='fw-semibold'>Nombre:</span> {tarea.nombre}</p>
                <p> <span className='fw-semibold'>Imagen:</span> {tarea.imagen}</p>
                <p> <span className='fw-semibold'>Precio:</span> {tarea.precio}</p>
                <p> <span className='fw-semibold'>Activo:</span> {tarea.activo}</p>
                <p> <span className='fw-semibold'>Descripcion:</span> {tarea.descripcion}</p>
              </div>
              <div className='boton-editar-eliminar'>
                <button className='mb-2 btn btn-dark' type="button" onClick={() => setTarea(tarea)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark'
                  onClick={() => { handleEliminar(tarea.id) }} >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No hay tareas</p>
        </>
      )}
          <AllProductos/>
    </div>
  )
}

export default Resultado
