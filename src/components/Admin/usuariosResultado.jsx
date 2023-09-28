import './styles/resultado.css';

const UsuariosResultado = ({ usuarios, setUsuario, eliminandoUsuario }) => {
  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el usuario?');
    if (respuesta) {
      eliminandoUsuario(id);
    }
  };

  return (
    <div>
      {usuarios && usuarios.length ? (
        <>
          {usuarios.map((usuario, index) => (
            <div key={index} className="contenedor-agregados agregados-texto">
              <div>
                <p> <span className='fw-semibold'>Nombre:</span> {usuario.nombre}</p>
                <p> <span className='fw-semibold'>Email:</span> {usuario.correo}</p>
                <p> <span className='fw-semibold'>Contraseña:</span> {usuario.password}</p>
                <p> <span className='fw-semibold'>Activo:</span> {usuario.estado ? 'Si' : 'No'}</p>
                <p> <span className='fw-semibold'>Direccion:</span> {usuario.direc}</p>
                <p> <span className='fw-semibold'>Rol del Usuario:</span> {usuario.rol}</p>
              </div>
              <div>
              </div>
              <div className='boton-editar-eliminar'>
                <button className='mb-2 btn btn-dark' type="button" onClick={() => setUsuario(usuario)}>Editar</button>
                <button
                  className='mb-2 btn btn-dark'
                  onClick={() => { handleEliminar(usuario.id) }} >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No hay Usuarios</p>
        </>
      )}
    </div>
  );
};

export default UsuariosResultado;
