import { useEffect, useState } from 'react';
import UsuariosResultado from './usuariosResultado';

function Usuarios() {
  // Estados para manejar usuarios y campos del formulario
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});

  // Estados para los campos del formulario
  const [idUsuario, setidUsuario] = useState()
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState(false);
  const [rol, setRol] = useState('');
  const [direc, setDirec] = useState('');


  const [editUser, setEditUser] = useState(false)

  let token = localStorage.getItem('token');

  //TRAER PRODUCTOS DEL BACKEND
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
      obtenerUsuarios(); // Actualizar la lista de productos
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  //EDITAR USUARIOS DEL BACKEND
  const datosEdicion = (id) => {
    const usuarioFind = usuarios.find((usuario) => usuario._id === id);
    console.log(id);
    console.log(usuarioFind);
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

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !rol || !direc) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    if (editUser) {
      // Editar un usuario existente
      editarUsuario();
    } else {
      // Agregar un nuevo usuario
      agregarUsuario()
    }

    // Limpiar los campos del formulario
    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false);
    setRol('');
    setDirec('');
  };

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  const cargarUsuarios = () => {
    if (Object.keys(usuario.length > 0)) {
      setNombre(usuario.nombre)
      setCorreo(usuario.correo)
      setPassword(usuario.password)
      setEstado(usuario.estado)
      setRol(usuario.rol)
      setDirec(usuario.direc)
    } else {
      console.log('No hay nada en el array de tarea');
    }
  }

  return (
    <main>
      <form className="col-lg-12 col-8 my-auto producto-contenedor bg-white p-2 rounded" onSubmit={handleSubmit}>
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
              className='col-lg-6 col-3 input-productos p-1 input-nombre rounded border border-black border-opacity-50'
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