import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { path, component: Component, render, user, ...rest } = props;
  console.log(user);
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!user.jwt || user.role !== "editor") return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

const checkingJwt = (state) => ({ user: state.editorState.user });

export default connect(checkingJwt, null)(ProtectedRoute);
