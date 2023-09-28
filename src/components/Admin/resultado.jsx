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
                <p> <span className='fw-semibold'>Nombre:</span> {producto.productName}</p>
                <p> <span className='fw-semibold'>Imagen:</span> {producto.productImage}</p>
                <p> <span className='fw-semibold'>Precio:</span> {producto.productPrice}</p>
                <p> <span className='fw-semibold'>Activo:</span> {producto.activeProduct ? 'Si' : 'No'}</p>
                <p> <span className='fw-semibold'>Categoria:</span> {producto.productCategory}</p>
                <p> <span className='fw-semibold'>Descripcion:</span> {producto.productDetail}</p>
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