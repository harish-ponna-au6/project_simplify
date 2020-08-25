import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { userType, path, component: Component, render, user, ...rest } = props;
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!user.isLoggedIn || user.role !== userType)
          return <Redirect to="/" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

const user = (state) => ({ user: state.commonState.user });

export default connect(user, null)(ProtectedRoute);
