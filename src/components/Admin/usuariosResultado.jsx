
const UsuariosResultado = ({ usuarios, editarUsuario, eliminarUsuario }) => {

  const handleEliminar = (id) => {
    const respuesta = window.confirm('¿Desea eliminar el usuario?');
    if (respuesta) {
      eliminarUsuario(id);
    }
  };

  const handleEditar = (id) => {
    const respuesta = confirm('¿Desea editar el usuario?')
    if (respuesta) {
      editarUsuario(id)
    }
  }

  return (
    <div className='container-fluid p-3'>
      <>
        {usuarios.map((usuario, id) => (
          <div key={id} className="row p-2 my-3 rounded bg-white contenedor-agregados agregados-texto">
            <div className='col my-auto'>
              <div className='row'>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Nombre:</span> {usuario.nombre}</p>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Email:</span> {usuario.correo}</p>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Contraseña:</span> {usuario.password}</p>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Activo:</span> {usuario.estado ? 'Si' : 'No'}</p>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Direccion:</span> {usuario.direc}</p>
                <p className="col-lg-2 mb-0"> <span className='d-flex fw-semibold'>Rol del Usuario:</span> {usuario.rol}</p>
              </div>
            </div>
            <div className="col-lg-1 col-12">
              <div className='row'>
                <button className='mb-2 btn btn-dark m-auto' type="button" onClick={() => handleEditar(usuario._id)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark m-auto'
                  onClick={() => handleEliminar(usuario._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default UsuariosResultado;
