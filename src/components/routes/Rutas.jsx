import React from 'react';
import { Route} from 'react-router-dom';

const PrivateRoute = ({ component: Component, roleRequired, ...rest }) => {
    const userRole = localStorage.getItem('userRole'); // Obtén el rol del usuario del almacenamiento local

    return (
        <Route
            
        />
    );
};

export default PrivateRoute;