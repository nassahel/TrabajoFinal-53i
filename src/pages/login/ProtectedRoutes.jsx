import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, userRole }) => {
    // Verifica si el usuario es un administrador
    const isAdmin = userRole === 'USER_ADMIN';

    useEffect(() => {
        // Si el usuario no es un administrador, redirige a la página de inicio
        if (!isAdmin) {
            // Puedes redirigir a la página que desees, por ejemplo, la página de inicio
            // Cambia '/login' por la ruta que prefieras
            return <Navigate to="/" />;
        }
    }, [isAdmin]);

    // Si el usuario es un administrador, muestra el contenido de las rutas protegidas
    return isAdmin ? children : null;
};

export default ProtectedRoutes;