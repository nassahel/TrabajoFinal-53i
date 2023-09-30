import './styles/resultado.css';
import React from 'react';

const UsuariosResultado = ({ usuarios, setUsuario, eliminarUsuario }) => {
  const handleEliminar = (id) => {
    const respuesta = window.confirm('¿Desea eliminar el usuario?'); // Utiliza window.confirm para mostrar el cuadro de confirmación
    if (respuesta) {
      eliminarUsuario(id); // Llama a la función eliminarUsuario cuando se confirme la eliminación
    }
  };

  return (
    <div>
      {usuarios.map((usuario, id) => (
        <div key={id} className="contenedor-agregados agregados-texto">
          <div>
            <p> <span className='fw-semibold'>Nombre:</span> {usuario.nombre}</p>
            <p> <span className='fw-semibold'>Email:</span> {usuario.correo}</p>
            <p> <span className='fw-semibold'>Contraseña:</span> {usuario.password}</p>
            <p> <span className='fw-semibold'>Activo:</span> {usuario.estado ? 'Si' : 'No'}</p>
            <p> <span className='fw-semibold'>Direccion:</span> {usuario.direc}</p>
            <p> <span className='fw-semibold'>Rol del Usuario:</span> {usuario.rol}</p>
          </div>
          <div className='boton-editar-eliminar'>
            <button className='mb-2 btn btn-dark' type="button" onClick={() => setUsuario(usuario.id)}>Editar</button>
            <button
              className='mb-2 btn btn-dark'
              onClick={() => handleEliminar(usuario.id)} // Utiliza la función handleEliminar para eliminar usuarios
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsuariosResultado;

/* import './styles/resultado.css';
import React from 'react';

const UsuariosResultado = ({ usuarios, setUsuario, eliminarUsuario }) => {
  const handleEliminar = (id) => {
    const respuesta = confirm('¿Desea eliminar el usuario?');
    if (respuesta) {
      eliminarUsuario(id);
    }
  };

  return (
    <div>
      { (
        <>
          {
           usuarios.map((usuario) => (
            <div key={usuario.id} className="contenedor-agregados agregados-texto">
              <div>
                <p> <span className='fw-semibold'>Nombre:</span> {usuario.nombre}</p>
                <p> <span className='fw-semibold'>Email:</span> {usuario.correo}</p>
                <p> <span className='fw-semibold'>Contraseña:</span> {usuario.password}</p>
                <p> <span className='fw-semibold'>Activo:</span> {usuario.estado ? 'Si' : 'No'}</p>
                <p> <span className='fw-semibold'>Direccion:</span> {usuario.direc}</p>
                <p> <span className='fw-semibold'>Rol del Usuario:</span> {usuario.rol}</p>
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
      )}
    </div>
  );
};

export default UsuariosResultado; */
