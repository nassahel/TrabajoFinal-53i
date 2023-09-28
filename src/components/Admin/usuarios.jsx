import { useEffect, useState } from 'react';
import UsuariosResultado from './usuariosResultado';
import '../Admin/styles/productos.css';

function Usuarios() {
  // Definir los productos iniciales de la base de datos
  const usuariosBd = [{
    id: 1,
    userName: 'Pia Lopez',
    userEmail: 'pialopez@gmail.com',
    userPassword: '123456',
    activeUser: true,
    roleUser: 'Admin',
    address: 'Santiago 1064'
  },
  {
    id: 2,
    userName: 'Luis',
    userEmail: 'pialopez@gmail.com',
    userPassword: '123456',
    activeUser: true,
    roleUser: 'Admin',
    address: 'Santiago 1064'
  },
  {
    id: 3,
    userName: 'Nassa',
    userEmail: 'pialopez@gmail.com',
    userPassword: '123456',
    activeUser: true,
    roleUser: 'Admin',
    address: 'Santiago 1064'
  }
  ]

  // Estados para manejar productos
  const [usuarios, setUsuarios] = useState(usuariosBd);
  const [usuario, setUsuario] = useState({});

  // Estados para los campos del formulario
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [activeUser, setActiveUser] = useState(false); // Establecemos el valor inicial en false
  const [roleUser, setRoleUser] = useState('');
  const [address, setAddress] = useState('');

  // Función para agregar o editar usuarios
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!userName || !userEmail || !userPassword || !roleUser || !address) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    // Crear un nuevo usuario
    const newUser = {
      userName,
      userEmail,
      userPassword,
      roleUser,
      activeUser,
      address
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
    setUserName('');
    setuserEmail('');
    setUserPassword('');
    setActiveUser(false); // Establecer el valor predeterminado en false
    setRoleUser('');
    setAddress('');
  };

  // Función para eliminar un producto
  const eliminandoUsuario = (id) => {
    const updatedUser = usuarios.filter((p) => p.id !== id);
    setUsuarios(updatedUser);
  };

  // Efecto para guardar y cargar productos en el localStorage
  useEffect(() => {
    // Cargar productos desde el localStorage al montar el componente
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios'));

    if (usuariosGuardados) {
      setUsuarios(usuariosGuardados);
    } else {
      // Si no hay productos en el localStorage, establecer los productos iniciales de la base de datos
      setUsuarios(usuarios);
    }
  }, []);

  useEffect(() => {
    // Guardar usuarios en el localStorage cuando cambien
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  useEffect(() => {
    if (usuario.id) {
      setUserName(usuario.userName);
      setuserEmail(usuario.userEmail);
      setUserPassword(usuario.userPassword);
      setActiveUser(usuario.activeUser); // Establecer como un booleano
      setRoleUser(usuario.roleUser);
      setAddress(usuario.address);
    } else {
      // Restablecer los campos del formulario cuando no se está editando
      setUserName('');
      setuserEmail('');
      setUserPassword('');
      setActiveUser(false); // Establecer como false
      setRoleUser('');
      setAddress('');
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className='mt-3'>
          <div className="d-flex justify-content-evenly align-items-center">
            <div className="form-group ">
              <label className='text-center producto-texto fs-6' htmlFor="password">Contraseña Usuario</label>
              <input
                className='form-control input-productos'
                type="text"
                name="password"
                id="password"
                placeholder="Contraseña"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <label className='text-center producto-texto fs-6' htmlFor="activo">Usuario Activo</label>
              <select
                className='form-control input-productos w-xx' // Aumenta la anchura al 50% del contenedor
                name="activo"
                id="activo"
                value={activeUser}
                onChange={(e) => setActiveUser(e.target.value === 'true')}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group ms-2">
              <label className='text-center producto-texto fs-6' htmlFor="role">Rol del Usuario</label>
              <input
                className='form-control input-productos'
                name="role"
                id="role"
                placeholder="Rol del Usuario"
                value={roleUser}
                onChange={(e) => setRoleUser(e.target.value)}
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
    </main>
  );
}

export default Usuarios;
