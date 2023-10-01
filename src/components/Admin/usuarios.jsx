import { useEffect, useState } from 'react';
import UsuariosResultado from './usuariosResultado';
import '../Admin/styles/productos.css';

function Usuarios() {
  // Estados para manejar usuarios y campos del formulario
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState(false);
  const [rol, setRol] = useState('');
  const [direc, setDirec] = useState('');


  // Obtener el token de localStorage y asegurarse de que sea una cadena JSON válida
  let token = localStorage.getItem('token');


  const obtenerUsuarios = async () => {
    try {
      const url = 'https://backend-rolling53i.onrender.com/api/usuarios';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }
      localStorage.setItem('token', token);

      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);  // Este efecto solo se ejecuta una vez al cargar la página

  // Función para agregar un nuevo usuario
  const agregarUsuario = async () => {
    try {
      const newUser = {
        nombre,
        correo,
        password,
        rol,
        estado,
        direc,
      };

      const url = 'https://backend-rolling53i.onrender.com/api/usuarios';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token, // Asegurarse de que token sea un objeto válido
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('No se pudo agregar el usuario');
      }

      console.log('Usuario agregado con éxito');
      obtenerUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
    }
  };

  // Función para editar un usuario existente
  const editarUsuario = async () => {
    try {
      const updatedUser = {
        id: usuario.id, // Usar el ID del usuario que se está editando
        nombre,
        correo,
        password,
        rol,
        estado,
        direc,
      };

      const url = `https://backend-rolling53i.onrender.com/api/usuarios/${usuario.id}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('No se pudo editar el usuario');
      }

      console.log('Usuario editado con éxito');
      obtenerUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };


  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      const url = `https://backend-rolling53i.onrender.com/api/usuarios/${id}`; // Incluir el ID en la URL
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
      }

      console.log('Usuario eliminado con éxito');
      obtenerUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !password || !rol || !direc) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    if (usuario.id) {
      // Editar un usuario existente
      editarUsuario();
    } else {
      // Agregar un nuevo usuario
      agregarUsuario();
    }

    // Limpiar los campos del formulario
    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false);
    setRol('');
    setDirec('');
    setUsuario({}); // Limpiar el estado de usuario
  };

  return (
    <main>
      <form className="producto-contenedor d-flex flex-column align-items-center" onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="nombre">Nombre Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="email">Email Usuario</label>
              <input
                className='input-productos p-1 w-75 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="password">Contraseña Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="activo">Usuario Activo</label>
              <select
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                name="activo"
                id="activo"
                value={estado}
                onChange={(e) => setEstado(e.target.value === 'true')}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="direc">Dirección Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                name="direc"
                id="direc"
                placeholder="Dirección del Usuario"
                value={direc}
                onChange={(e) => setDirec(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="rol">Rol del Usuario</label>
              <input
                className='mt-0 input-descripcion w-75 p-2 input-nombre rounded border border-black border-opacity-50'
                name="rol"
                id="rol"
                placeholder="Rol del Usuario"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className=' text-center'>
              <input
                className="mt-3 mb-5 btn btn-dark"
                type="submit"
                value={usuario.id ? 'Editar Usuario' : 'Agregar Usuario'}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="resultado">
        <UsuariosResultado
          usuarios={usuarios}
          setUsuario={setUsuario}
          eliminarUsuario={eliminarUsuario} // Pasar la función eliminarUsuario como prop
        />
      </div>
    </main>
  );
}

export default Usuarios;



/* import { useEffect, useState } from 'react';
import UsuariosResultado from './usuariosResultado';
import '../Admin/styles/productos.css';


function Usuarios() {


  // Estados para manejar productos
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estado, setEstado] = useState(false); // Establecemos el valor inicial en false
  const [rol, setRol] = useState('');
  const [direc, setDirec] = useState('');

  const obtenerUsuarios = async () => {
    try {
      const url = 'https://backend-rolling53i.onrender.com/api/usuarios';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }

      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, [usuarios]);

  // Función para agregar o editar usuarios
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !correo || !password || !rol || !direc) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    // Crear un nuevo usuario
    const newUser = {
      nombre,
      correo,
      password,
      rol,
      estado,
      direc
    };


    if (usuario.id) {
      // Editar un usuario existente
      const updatedUsuarios = usuarios.map((u) => (u.id === usuario.id ? { ...newUser, id: u.id } : u));
      setUsuarios(updatedUsuarios);
      setUsuario({});
    } else {
      // Agregar un nuevo usuario
      newUser.id = generoIdDinamico();
      setUsuarios([...usuarios, newUser]);
    }

    // Limpiar los campos del formulario
    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false); // Establecer el valor predeterminado en false
    setRol('');
    setDirec('');
  };

  // Función para eliminar un producto
  const eliminandoUsuario = async (id) => {
    const url = `https://backend-rolling53i.onrender.com/api/usuarios/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otros encabezados si es necesario, como tokens de autenticación
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo eliminar el usuario');
      }

      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  }; */

/*   const eliminandoUsuario = (id) => {
    const updatedUser = usuarios.filter((p) => p.id !== id);
    setUsuarios(updatedUser);
  }; */

//PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
/* useEffect(() => {
  if (usuario.id) {
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setPassword(usuario.password);
    setEstado(usuario.estado); // Establecer como un booleano
    setRol(usuario.rol);
    setDirec(usuario.direc);
  } else {
    // Restablecer los campos del formulario cuando no se está editando
    setNombre('');
    setCorreo('');
    setPassword('');
    setEstado(false); // Establecer como false
    setRol('');
    setDirec('');
  }
}, [usuario]); */



// Función para generar un ID dinámico
/*   const generoIdDinamico = () => {
    const ran = Math.random();
    const fecha = Date.now();
    return ran + fecha;
  };

  return (
    <main>
      <form className="producto-contenedor d-flex flex-column align-items-center" onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="nombre">Nombre Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="email">Email Usuario</label>
              <input
                className='input-productos p-1 w-75 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="password">Contraseña Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                type="text"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="activo">Usuario Activo</label>
              <select
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                name="activo"
                id="activo"
                value={estado}
                onChange={(e) => setEstado(e.target.value === 'true')}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="direc">Dirección Usuario</label>
              <input
                className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
                name="direc"
                id="direc"
                placeholder="Dirección del Usuario"
                value={direc}
                onChange={(e) => setDirec(e.target.value)}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mt-3 text-center'>
              <label className='producto-texto fs-6' htmlFor="rol">Rol del Usuario</label>
              <input
                className='mt-0 input-descripcion w-75 p-2 input-nombre rounded border border-black border-opacity-50'
                name="rol"
                id="rol"
                placeholder="Rol del Usuario"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12'>
            <div className=' text-center'>
              <input
                className="mt-3 mb-5 btn btn-dark"
                type="submit"
                value={usuario.id ? 'Editar Usuario' : 'Agregar Usuario'}
              />
            </div>
          </div>
        </div>
      </form>

      <div className="resultado">
        <UsuariosResultado
          usuarios={usuarios}
          setUsuario={setUsuario}
          eliminandoUsuario={eliminandoUsuario}
        />
      </div>
    </main>

  );
}

export default Usuarios;  */