import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import AdminLogin from "./AdminLogin";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import AdminHome from "./AdminHome";
import AdminForgotPassword from "./AdminForgotPassword";
import AdminProfile from "./AdminProfile";
import AdminFilterEditors from "./AdminFilterEditors";
import AdminViewSingleEditor from "./AdminViewSingleEditor";
import AdminSearchEditors from "./AdminSearchEditors";

const Customer = () => {
  return (
    <div className="Customer">
      <Navbar />
      <Switch>
        <Route exact path="/admin/login" component={AdminLogin} />
        <ProtectedRoute
          userType="admin"
          exact
          path="/admin/home"
          component={AdminHome}
        />
        <Route
          exact
          path="/admin/forgot-password"
          component={AdminForgotPassword}
        />
        <ProtectedRoute
          userType="admin"
          exact
          path="/admin/profile"
          component={AdminProfile}
        />
        <ProtectedRoute
          userType="admin"
          exact
          path="/admin/filter-editors"
          component={AdminFilterEditors}
        />
        <ProtectedRoute
          userType="admin"
          exact
          path="/admin/view-single-editor/:editorId"
          component={AdminViewSingleEditor}
        />
        <ProtectedRoute
          userType="admin"
          exact
          path="/admin/search/editors-by-office-name"
          component={AdminSearchEditors}
        />

        <Redirect to="/admin/home" />
      </Switch>
    </div>
  );
};

export default Customer;
