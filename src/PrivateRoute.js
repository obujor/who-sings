import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loginPath, isLoggedIn, render, ...rest }) => {
  const renderComponent = (props) =>
    render ?
      render(props) :
      <Component {...props} />
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          renderComponent(props)
        ) : (
          <Redirect to={{ pathname: loginPath, state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
