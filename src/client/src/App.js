import React from "react";
import { ToastContainer } from "react-toastify";
import "./styles/App.css";
import Landing from "./pages/Landing";
import { Route, Switch } from "react-router-dom";
import Editor from "./pages/editor/Editor";
import Customer from "./pages/customer/Customer";
import Admin from "./pages/admin/Admin";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/common/Loading";
import { connect } from "react-redux";
import { ReactQueryDevtools } from "react-query-devtools";
import { AnimatePresence } from "framer-motion";

const App = (props) => {
  const { isLoading } = props;
  return (
    <div className="App">
      <ToastContainer />
      {isLoading && <Loading />}
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/editor" component={Editor} />
          <Route path="/customer" component={Customer} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </AnimatePresence>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

const isLoading = (state) => ({ isLoading: state.commonState.isLoading });

export default connect(isLoading, null)(App);
