import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roleRequired, ...rest }) => {
    const userRole = localStorage.getItem('userRole'); // Obtén el rol del usuario del almacenamiento local

    return (
        <Route
            {...rest}
            render={(props) =>
                userRole === roleRequired ? (
                    <Component {...props} />
                ) : (
                    <Redirect />
                )
            }
        />
    );
};

export default PrivateRoute;