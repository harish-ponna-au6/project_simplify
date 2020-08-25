import React from "react";
import EditorRegister from "./EditorRegister";
import { Route, Switch, Redirect } from "react-router-dom";
import EditorLogin from "./EditorLogin";
import Navbar from "../../components/editor/Navbar";
import EditorHome from "./EditorHome";
import EditorCreateAccount from "./EditorCreateAccount";
import EditorCreateOrder from "./EditorCreateOrder";
import EditorFilterOrders from "./EditorFilterOrders";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import EditorViewSingleOrder from "./EditorViewSingleOrder";
import EditorViewAllOrder from "./EditorViewAllOrder";
import EditorSearchOrders from "./EditorSearchOrders";
import EditorSearchCustomers from "./EditorSearchCustomers";
import EditorCustomerOrders from "./EditorCustomerOrders";
import EditorAllCustomers from "./EditorAllCustomers";
import EditorProfile from "./EditorProfile";
import EditorForgotPassword from "./EditorForgotPassword";
import EditorActivateAccount from "./EditorActivateAccount";

const Editor = () => {
  return (
    <div className="Editor">
      <Navbar />
      <Switch>
        <Route exact path="/editor/register" component={EditorRegister} />
        <Route
          exact
          path="/editor/activate-account"
          component={EditorActivateAccount}
        />
        <Route exact path="/editor/login" component={EditorLogin} />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/home"
          component={EditorHome}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/create-account"
          component={EditorCreateAccount}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/create-order"
          component={EditorCreateOrder}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/filter-orders"
          component={EditorFilterOrders}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/view-single-order/:orderId"
          component={EditorViewSingleOrder}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/view-all-orders"
          component={EditorViewAllOrder}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/search/orders-by-title"
          component={EditorSearchOrders}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/search/customers-by-office-name"
          component={EditorSearchCustomers}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/customer-orders/:customerId"
          component={EditorCustomerOrders}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/all-customers"
          component={EditorAllCustomers}
        />
        <ProtectedRoute
          userType="editor"
          exact
          path="/editor/profile"
          component={EditorProfile}
        />
        <Route
          exact
          path="/editor/forgot-password"
          component={EditorForgotPassword}
        />

        <Redirect to="/editor/home" />
      </Switch>
    </div>
  );
};

export default Editor;
