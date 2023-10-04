
const PedidosResultado = ({ pedidos, modificarPedidos }) => {

  const handleEditar = (id) => {
    const respuesta = confirm('¿Desea editar el producto?')
    if (respuesta) {
      console.log(id);
      modificarPedidos(id)
    }
  }

  return (
    <div className='container-fluid p-3'>
      <>
        {pedidos.map((pedido, index) => (
          <div key={index} className=" row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row'>
              <p><span className='fw-semibold'>Codigo de Orden:</span> {pedido._id}</p>
                <p><span className='fw-semibold'>ID del Usuario:</span> {pedido.user}</p>
                <p><span className='fw-semibold'>Costo Total:</span> ${pedido.totalCost}</p>
                <p> <span className='fw-semibold'>Estado:</span> {pedido.status}</p>
              </div>
            </div >
            <div className='col-lg-1 col-12'>
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(pedido._id)}>Editar</button>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default PedidosResultado;

