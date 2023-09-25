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
  const [activeUser, setActiveUser] = useState(Boolean);
  const [roleUser, setRoleUser] = useState('');
  const [address, setAddress] = useState('');

  // Función para agregar o editar usuarios
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!userName || !userEmail || !userPassword || !activeUser || !roleUser || !address) {
      console.log('Todos los campos deben estar completos');
      return;
    }

    // Crear un nuevo producto
    const newUser = {
      userName,
      userEmail,
      userPassword,
      roleUser,
      activeUser: Boolean(activeUser), // Convertir a booleano
      address
    };

    if (usuario.id) {
      // Editar un producto existente
      const updatedUsuarios = usuarios.map((p) => (p.id === usuario.id ? { ...newUser, id: p.id } : p));
      setUsuarios(updatedUsuarios);
      setUsuario({});
    } else {
      // Agregar un nuevo producto
      newUser.id = generoIdDinamico();
      setUsuarios([...usuarios, newUser]);
    }

    // Limpiar los campos del formulario
    setUserName('');
    setuserEmail('');
    setUserPassword('');
    setActiveUser(false);
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
    // Guardar productos en el localStorage cuando cambien
    localStorage.setItem('usuarios', JSON.stringify(usuariosBd));
  }, [usuarios]);

  //PARA QUE APAREZCA LOS PRODUCTOS EN EL INPUT CUANDO PONGA EDITAR
  useEffect(() => {
    if (usuario.id) {
      setUserName(usuario.userName);
      setuserEmail(usuario.userEmail);
      setUserPassword(usuario.userPassword);
      setActiveUser(usuario.activeUser);
      setRoleUser(usuario.roleUser);
      setAddress(usuario.address);
    } else {
      // Restablecer los campos del formulario cuando no se está editando
      setUserName('');
      setuserEmail('');
      setUserPassword('');
      setActiveUser(false);
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
      <form className="producto-contenedor d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
        <div className='mt-3 d-flex justify-content-center align-items-center'>
          <label className='text-center producto-texto fs-6' htmlFor="nombre">Nombre Usuario</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="nombre">Email Usuario</label>
          <input
            className='input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setuserEmail(e.target.value)}
          />
        </div>
        <div className='mt-3 d-flex justify-content-center align-items-center'>
          <label className='text-center producto-texto fs-6' htmlFor="nombre">Contraseña Usuario</label>
          <input
            className=' input-productos w-75 p-1  input-nombre rounded border border-black border-opacity-50'
            type="text"
            name="password"
            id="password"
            placeholder="Contrañesa"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="descripcion">Usuario Activo</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            name="activo"
            id="activo"
            placeholder="Usuario Activo"
            value={activeUser}
            onChange={(e) => setActiveUser(e.target.value)}
          />
        </div>
        <div className='mt-3 d-flex justify-content-start align-items-center'>
          <label className='text-center producto-texto fs-6' htmlFor="descripcion">Direccion Usuario</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            name="address"
            id="address"
            placeholder="Direccion del Usuario"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label className='ps-2 text-center producto-texto fs-6' htmlFor="descripcion">Rol del Usuario</label>
          <input
            className='input-productos w-75 p-1 input-nombre rounded border border-black border-opacity-50'
            name="role"
            id="role"
            placeholder="Rol del Usuario"
            value={roleUser}
            onChange={(e) => setRoleUser(e.target.value)}
          />
        </div>
        <input
          className="mb-5 btn btn-dark"
          type="submit"
          value={usuario.id ? 'Editar Usuario' : 'Agregar Usuario'}
        />
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
