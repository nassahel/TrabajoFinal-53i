import './styles/resultado.css'
const Resultado = ({ productos, setProducto, eliminarProductos }) => {

  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el producto?')
    if (respuesta) {
      eliminarProductos(id)
    }
  }


  return (
    <div>
        <>
          {productos.map((producto, index) => (
            <div key={index} className="contenedor-agregados agregados-texto">
              <div>
                <p> <span className='fw-semibold'>Nombre:</span> {producto.name}</p>
                <p className='w-75'> <span className='fw-semibold'>Img:</span> {producto.image}</p>
                <p> <span className='fw-semibold'>Precio:</span> {producto.price}</p>
                <p> <span className='fw-semibold'>Activo:</span> {producto.active ? 'Si' : 'No'}</p>
                <p> <span className='fw-semibold'>Categoria:</span> {producto.category}</p>
                <p> <span className='fw-semibold'>Descripcion:</span> {producto.detail}</p>
              </div>
              <div>
              </div>
              <div className='boton-editar-eliminar'>
                <button className='mb-2 btn btn-dark h-25' type="button" onClick={() => setProducto(producto.id)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark w-100'
                  onClick={() => { handleEliminar(producto._id) }} >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
    </div>
  )
}

export default Resultado