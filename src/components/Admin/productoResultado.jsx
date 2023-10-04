
const Resultado = ({ productos, editarProducto, eliminarProducto }) => {

  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el producto?')
    if (respuesta) {
      eliminarProducto(id)
    }
  }

  const handleEditar = (id) => {
    const respuesta = confirm('¿Desea editar el producto?')
    if (respuesta) {
      console.log(id);
      editarProducto(id)
    }
  }


  return (
    <div className='container-fluid p-3'>
      <>
        {productos.map((producto, index) => (
          <div key={index} className="row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row '>
                <div className='col-lg-1 col-5'>
                  <img className='img-fluid col-9' src={producto.image} alt="imagen de comida" />
                </div>
                <p className='col-12 col-lg-2 mb-0'><span className='d-flex fw-semibold'>Nombre:</span>{producto.name}</p>
                <p className='col-12 col-lg-2 mb-0'> <span className='d-flex fw-semibold'>Precio:</span> {producto.price}</p>
                <p className='col-12 col-lg-2 mb-0'> <span className='d-flex fw-semibold'>Activo:</span> {producto.active ? 'Si' : 'No'}</p>
                <p className='col-12 col-lg-2 mb-0'> <span className='d-flex fw-semibold'>Categoria:</span> {producto.category}</p>
                <p className='col-12 col-lg-3 text-start mb-0'> <span className='d-flex fw-semibold'>Descripcion:</span> {producto.detail}</p>
              </div>
            </div>
            <div className='col-lg-1 col-12'>
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(producto._id)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark m-auto'
                  onClick={() => { handleEliminar(producto._id) }} >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </>

    </div>
  )
}

export default Resultado