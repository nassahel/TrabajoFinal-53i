import './styles/resultado.css';

const PedidosResultado = ({ pedidos, setPedido }) => {
    return (
        <div>
            {pedidos && pedidos.length ? (
                <>
                    {pedidos.map((pedido, index) => (
                        <div key={index} className="contenedor-agregados agregados-texto">
                            <div>
                                <p><span className='fw-semibold'>Nombre del Usuario:</span>{pedido.user}</p>
                                <p> <span className='fw-semibold'>Estado:</span> {pedido.status}</p>
                            </div>
                            <div className='boton-editar-eliminar'>
                                <button className='mb-2 btn btn-dark' type="button" onClick={() => setPedido(pedido)}>Editar</button>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <p>No hay Pedidos</p>
                </>
            )}
        </div>
    );
};

export default PedidosResultado;

