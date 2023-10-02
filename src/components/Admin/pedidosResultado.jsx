
const PedidosResultado = ({ pedidos, setPedido }) => {
  return (
    <div className='container-fluid p-3'>
      <>
        {pedidos.map((pedido, index) => (
          <div key={index} className=" row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row'>
                <p><span className='fw-semibold'>Nombre del Usuario:</span>{pedido.user}</p>
                <p> <span className='fw-semibold'>Estado:</span> {pedido.status ? 'Realizado' : 'Pendiente'}</p>
              </div>
            </div >
            <div className='col-lg-1 col-10'>
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => setPedido(pedido)}>Editar</button>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default PedidosResultado;

