import { useEffect, useState } from 'react';
import UsuariosResultado from './UsuariosResultado';

function Usuarios() {
  
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});


  const [idUsuario, setidUsuario] = useState()
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState(false);
  const [rol, setRol] = useState('');
  const [direc, setDirec] = useState('');


  const [editUser, setEditUser] = useState(false)

  let token = localStorage.getItem('token');


  const obtenerUsuarios = async () => {

    const data = await fetch('https://backend-rolling53i.onrender.com/api/usuarios');
    const prom = await data.json();
    setUsuarios(prom.usuarios);

  }

  useEffect(() => {
    obtenerUsuarios();
  }, []);


  //AGREGAR USUARIOS AL BACKEND
  const agregarUsuario = async () => {
    try {
      const newUser = {
        nombre,
        correo,
        direc,
        password,
        rol,
        estado
      }
      const response = await fetch('https://backend-rolling53i.onrender.com/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar el usuario');
      }

      console.log('Producto agregado con éxito');
      obtenerUsuarios(); 
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR USUARIOS DEL BACKEND
  const datosEdicion = (id) => {
    const usuarioFind = usuarios.find((usuario) => usuario._id === id);
    if (usuarioFind) {
      setidUsuario(usuarioFind._id)
      setEditUser(true)
      setNombre(usuarioFind.nombre)
      setCorreo(usuarioFind.correo)
      setPassword(usuarioFind.password)
      setRol(usuarioFind.rol)
      setEstado(usuarioFind.estado)
      setDirec(usuarioFind.direc)
    }
  }

  const editarUsuario = async () => {
    try {
      const updatedUser = {
        nombre: nombre,
        correo: correo,
        password: password,
        rol: rol,
        estado: estado,
        direc: direc
      };

      const editIdUsuario = idUsuario;

      const response = await fetch(`https://backend-rolling53i.onrender.com/api/usuarios/${editIdUsuario}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(updatedUser)
      })

      if (!response.ok) {
        throw new Error('No se pudo editar el usuario');
      }

      setEditUser(false)

      console.log('Usuario editado con éxito');

      obtenerUsuarios();

    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  //ELIMINAR LOS PRODUCTOS DEL BACKEND
  const eliminarUsuario = async (id) => {
    try {
      const resp = await fetch(`https://backend-rolling53i.onrender.com/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        }
      })

      const data = await resp.json();
      obtenerUsuarios();
      return data;
    } catch (error) {

      return { msg: "No se conectó con backend" };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !rol || !direc) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    if (editUser) {
      editarUsuario();
    } else {
      agregarUsuario()
    }

    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false);
    setRol('');
    setDirec('');
  };


  return (
    <main className='container-fluid col-lg-11'>
      <form className=" m-auto producto-contenedor bg-white p-2 rounded" onSubmit={handleSubmit}>
        <div className='row mt-4'>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="nombre">Nombre Usuario</label>
            <input
              className='input-productos p-1 rounded border border-black border-opacity-50'
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className='col d-flex justify-content-center flex-column align-items-center text-center'>
            <label className='fs-6' htmlFor="email">Email Usuario</label>
            <input
              className='input-productos p-1 rounded border border-black border-opacity-50'
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>


          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="password">Contraseña Usuario</label>
            <input
              className='input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              type="text"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className='row mt-lg-4 mt-2'>
          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="activo">Usuario Activo</label>
            <select
              className='col-lg-4 col-4 input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              name="activo"
              id="activo"
              value={estado}
              onChange={(e) => setEstado(e.target.value === 'true')}
            >
              <option value={true}>Si</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="direc">Dirección Usuario</label>
            <input
              className='input-productos p-1 input-nombre rounded border border-black border-opacity-50'
              name="direc"
              id="direc"
              placeholder="Dirección del Usuario"
              value={direc}
              onChange={(e) => setDirec(e.target.value)}
            />
          </div>

          <div className='col-lg-4 text-center mt-2'>
            <label className='col-12 producto-texto fs-6' htmlFor="rol">Rol del Usuario</label>
            <input
              className='mt-0 input-descripcion p-1 input-nombre rounded border border-black border-opacity-50'
              name="rol"
              id="rol"
              placeholder="Rol del Usuario"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            />
          </div>
        </div>

        <div className='col-lg-12'>
          <div className='mt-2 text-center'>
              <input
                className="my-2 mb-3 btn btn-dark"
                type="submit"
                value={editUser ? 'Editar Usuario' : 'Agregar Usuario'}
              />
          </div>
        </div>
      </form>

      <div className="resultado">
        <UsuariosResultado
          usuarios={usuarios}
          editarUsuario={datosEdicion}
          eliminarUsuario={eliminarUsuario} // Pasar la función eliminarUsuario como prop
        />
      </div>
    </main>
  );
}

export default Usuarios;