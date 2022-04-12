import React from "react";
import { Redirect, Route } from "react-router-dom";


export const ProtectedRoute = ({ component: Component, ...rest }) => {
  // const { token } = useSelector(state => state.auth)

  const isAuth = () => {
    let token = localStorage.getItem("token")
    return token
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: props.location,
              }}
            />
          );
        }
      }}
    />
  );
};
