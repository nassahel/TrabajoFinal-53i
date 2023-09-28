import { useEffect, useState } from 'react';
import UsuariosResultado from './usuariosResultado';
import '../Admin/styles/productos.css';


function Usuarios() {
  // Definir los productos iniciales de la base de datos
/*   const usuariosBd = [
    {
      id: 1,
      nombre: 'Pia Lopez',
      correo: 'pialopez@gmail.com',
      password: '123456',
      estado: true,
      rol: 'Admin',
      direc: 'Santiago 1064'
    },
    {
      id: 2,
      nombre: 'Luis',
      correo: 'pialopez@gmail.com',
      password: '123456',
      estado: true,
      rol: 'Admin',
      direc: 'Santiago 1064'
    },
    {
      id: 3,
      nombre: 'Nassa',
      correo: 'pialopez@gmail.com',
      password: '123456',
      estado: true,
      rol: 'Admin',
      direc: 'Santiago 1064'
    }
  ]  */

    // Estados para manejar productos
    const [usuarios, setUsuarios] = useState(usuariosBd);
    const [usuario, setUsuario] = useState({});
  
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [estado, setEstado] = useState(false); // Establecemos el valor inicial en false
    const [rol, setRol] = useState('');
    const [direc, setDirec] = useState('');
 
   async function usuariosBd() {
    const url = 'https://backend-rolling53i.onrender.com/api/usuarios';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }
  
      const data = await response.json();
      console.log(data);
  
      return data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  } 
  console.log(usuarios);

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
  const eliminandoUsuario = (id) => {
    const updatedUser = usuarios.filter((p) => p.id !== id);
    setUsuarios(updatedUser);
  };

  // Efecto para guardar y cargar productos en el localStorage
/*   useEffect(() => {
    // Cargar usuarios desde el localStorage al montar el componente
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));

    if (usuariosGuardados) {
      setUsuarios(usuariosGuardados);
    }
  }, []);

  useEffect(() => {
    // Guardar usuarios en el localStorage cuando cambien
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]); */

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  useEffect(() => {
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
  }, [usuario]);



  // Función para generar un ID dinámico
  const generoIdDinamico = () => {
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
                value= {usuario.id ? 'Editar Usuario' : 'Agregar Usuario'}
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

export default Usuarios;

/* <main>
      <form className=" producto-contenedor d-flex flex-column justify-content-evenly align-items-center" onSubmit={handleSubmit}>
        <div className=''>
          <div className="mt-5 d-flex justify-content-center align-items-center">
            <div className="form-group me-2">
              <label className='text-center producto-texto fs-6' htmlFor="nombre">Nombre Usuario</label>
              <input
                className='form-control input-productos'
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group ms-2 me-2">
              <label className='text-center producto-texto fs-6' htmlFor="email">Email Usuario</label>
              <input
                className='form-control input-productos'
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <div className="d-flex justify-content-start align-items-center">
            <div className="form-group me-5">
              <label className='text-center producto-texto fs-6' htmlFor="password">Contraseña Usuario</label>
              <input
                className='form-control input-productos'
                type="text"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group ms-5">
              <label className='text-center producto-texto fs-6' htmlFor="activo">Usuario Activo</label>
              <select
                className='form-control input-productos w-xx' // Aumenta la anchura al 50% del contenedor
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

        <div className='mt-3'>
          <div className="d-flex justify-content-start align-items-center">
            <div className="form-group me-2">
              <label className='text-center producto-texto fs-6' htmlFor="address">Dirección Usuario</label>
              <input
                className='form-control input-productos'
                name="address"
                id="address"
                placeholder="Dirección del Usuario"
                value={direc}
                onChange={(e) => setDirec(e.target.value)}
              />
            </div>
            <div className="form-group ms-2">
              <label className='text-center producto-texto fs-6' htmlFor="role">Rol del Usuario</label>
              <input
                className='form-control input-productos'
                name="role"
                id="role"
                placeholder="Rol del Usuario"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className=''>
          <div className="d-flex justify-content-center align-items-center">
            <button
              className="mt-3 mb-5 btn btn-dark"
              type="submit"
            >
              {usuario.id ? 'Editar Usuario' : 'Agregar Usuario'}
            </button>
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
    </main> */