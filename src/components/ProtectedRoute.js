import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

export const ProtectedRoute = ({
  component: Component,
  checkAuth: checkAuth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated()) {
          console.log("checking auth:", checkAuth);
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

// Auth.isAuthenticated()
