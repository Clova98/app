import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import PokemonService from './services/pokemon-service';

const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!PokemonService.getAuthToken();

  if (!Component) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
