import React from "react";
import CommonNav from "./CommonNav";
import Input from "./Input";
import "../../styles/common/LoginForm.css";
import { withRegisterLoginState } from "../../hoc/withRegisterLoginState";
import { LOGIN, IS_LOADING } from "../../redux/actions/commonActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";
import { containerVariants } from "../../variants/commonVariants";

const checkingUser = (user) => {
  if (!user.isLoggedIn) return;
  return <Redirect to="/" />;
};

const LoginForm = (props) => {
  const {
    state: { email, password },
    handleOnChange,
    history: { push },
    LOGIN,
    IS_LOADING,
    user,
    heading,
    route,
    userType
  } = props;

  return (
    <>
      {checkingUser(user)}
      <CommonNav />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="LoginForm d-flex justify-content-center align-items-center"
      >
        <div className="col-md-6 col-lg-5 my-4 bg-light px-4 py-3 rounded">
          <form
            className="d-flex justify-content-ceneter flex-column"
            onSubmit={(e) => {
              e.preventDefault();
              LOGIN({
                user: { email, password },
                push,
                IS_LOADING,
                route,
                userType
              });
            }}
          >
            <h2 className="text-center mb-4">
              <svg
                height="50"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-circle"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                ></path>
              </svg>
              &ensp; {heading}
            </h2>

            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              handleOnChange={handleOnChange}
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              handleOnChange={handleOnChange}
              placeholder="Enter your password"
            />
            <button type="submit" className="btn ml-auto">
              Login
            </button>
          </form>
          {userType === "editor" && (
            <>
              <p className="text-center mt-4">
                Don't have an account ?{" "}
                <Link to="/editor/register">Register here</Link>
              </p>
              <p className="text-center mt-4">
                Forgot Password ?{" "}
                <Link to="/editor/forgot-password">Click here</Link>
              </p>
              <p className="text-center mt-4">
                Activate account ?{" "}
                <Link to="/editor/activate-account">Click here</Link>
              </p>
            </>
          )}
          {userType === "customer" && (
            <>
              <p className="text-center mt-4">
                Forgot Password ?{" "}
                <Link to="/customer/forgot-password">Click here</Link>
              </p>
            </>
          )}
          {userType === "admin" && (
            <>
              <p className="text-center mt-4">
                Forgot Password ?{" "}
                <Link to="/admin/forgot-password">Click here</Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

const user = (state) => ({ user: state.commonState.user });
export default connect(user, { LOGIN, IS_LOADING })(
  withRouter(withRegisterLoginState(LoginForm))
);
