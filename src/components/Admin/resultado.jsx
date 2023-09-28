import './styles/resultado.css'
const Resultado = ({ productos, setProducto, eliminandoProducto, eliminandoProductoExistente }) => {
  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el producto?')
    if (respuesta) {
      eliminandoProducto(id)
      eliminandoProductoExistente(id)
    }
  }


  return (
    <div>
      {productos && productos.length ? (
        <>
          {productos.map((producto, index) => (
            <div key={index} className="contenedor-agregados agregados-texto">
              <div>
                <p> <span className='fw-semibold'>Nombre:</span> {producto.name}</p>
                <p> <span className='fw-semibold'>Imagen:</span> {producto.image}</p>
                <p> <span className='fw-semibold'>Precio:</span> {producto.price}</p>
                <p> <span className='fw-semibold'>Activo:</span> {producto.active ? 'Si' : 'No'}</p>
                <p> <span className='fw-semibold'>Categoria:</span> {producto.category}</p>
                <p> <span className='fw-semibold'>Descripcion:</span> {producto.detail}</p>
              </div>
              <div>
              </div>
              <div className='boton-editar-eliminar'>
                <button className='mb-2 btn btn-dark' type="button" onClick={() => setProducto(producto)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark'
                  onClick={() => { handleEliminar(producto.id) }} >
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
    </div>
  )
}

export default Resultado