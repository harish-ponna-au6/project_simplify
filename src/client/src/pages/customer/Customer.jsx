import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../../components/customer/Navbar";
import CustomerLogin from "./CustomerLogin";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import CustomerHome from "./CustomerHome";
import CustomerForgotPassword from "./CustomerForgotPassword";
import CustomerProfile from "./CustomerProfile";
import CustomerEditorOrders from "./CustomerEditorOrders";
import CustomerViewSingleOrder from "./CustomerViewSingleOrder";
import CustomerSearchOrders from "./CustomerSearchOrders";

const Customer = () => {
  return (
    <div className="Customer">
      <Navbar />
      <Switch>
        <Route exact path="/customer/login" component={CustomerLogin} />
        <ProtectedRoute
          userType="customer"
          exact
          path="/customer/home"
          component={CustomerHome}
        />
        <Route
          exact
          path="/customer/forgot-password"
          component={CustomerForgotPassword}
        />
        <ProtectedRoute
          userType="customer"
          exact
          path="/customer/profile"
          component={CustomerProfile}
        />
        <ProtectedRoute
          userType="customer"
          exact
          path="/customer/orders-in-specific-editor/:editorId"
          component={CustomerEditorOrders}
        />
        <ProtectedRoute
          userType="customer"
          exact
          path="/customer/view-single-order/:orderId"
          component={CustomerViewSingleOrder}
        />
        <ProtectedRoute
          userType="customer"
          exact
          path="/customer/search/orders-by-title"
          component={CustomerSearchOrders}
        />

        <Redirect to="/customer/home" />
      </Switch>
    </div>
  );
};

export default Customer;
