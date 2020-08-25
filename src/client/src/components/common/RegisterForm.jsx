import React, { useState } from "react";
import CommonNav from "./CommonNav";
import Input from "./Input";
import Loading from "./Loading";
import "../../styles/common/RegisterForm.css";
import { withRegisterLoginState } from "../../hoc/withRegisterLoginState";
import { REGISTRATION } from "../../redux/actions/commonActions";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { containerVariants } from "../../variants/commonVariants";
import { motion } from "framer-motion";

const checkingUser = (user) => {
  if (!user.isLoggedIn || user.role === "editor") return;
  console.log("hitting redirection in registration");
  return <Redirect to="/" />;
};

const RegisterForm = (props) => {
  const {
    state: { name, email, password, mobile, officeName, address },
    handleOnChange,
    history: { push },
    user,
    REGISTRATION,
    heading,
    route,
    userType
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {userType === "editor" ? checkingUser(user) : null}
      {isLoading && <Loading />}
      {user.role !== "editor" && <CommonNav />}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="RegisterForm d-flex justify-content-center align-items-center"
      >
        <div className="col-md-10 my-5 bg-light px-3 py-3 rounded">
          <form
            className="d-flex justify-content-ceneter flex-column"
            onSubmit={(e) => {
              e.preventDefault();

              REGISTRATION({
                user: props.state,
                push,
                setIsLoading,
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
            <div className="d-flex justify-content-center flex-wrap">
              <div className="col-md-6">
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  value={name}
                  handleOnChange={handleOnChange}
                  placeholder="Enter name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  handleOnChange={handleOnChange}
                  placeholder="Enter email"
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  handleOnChange={handleOnChange}
                  placeholder="Enter password"
                />
                <Input
                  label="Mobile"
                  name="mobile"
                  type="tel"
                  value={mobile}
                  handleOnChange={handleOnChange}
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="col-md-6">
                {" "}
                <Input
                  label="Office Name"
                  name="officeName"
                  type="text"
                  value={officeName}
                  handleOnChange={handleOnChange}
                  placeholder="Enter office name"
                />
                <div className="form-group">
                  <label htmlFor="address">ADDRESS</label>
                  <textarea
                    className="form-control"
                    name="address"
                    id="address"
                    value={address}
                    placeholder="Enter address"
                    onChange={handleOnChange}
                    cols=""
                    rows="2"
                  />
                </div>
                <div className="d-flex">
                  <button type="submit" className="btn ml-auto">
                    Register
                  </button>
                </div>
                {userType === "editor" && (
                  <>
                    <p className="text-center mt-4">
                      Already have an account ?{" "}
                      <Link to="/editor/login">Login here</Link>
                    </p>
                    <p className="text-center mt-4">
                      Activate account ?{" "}
                      <Link to="/editor/activate-account">Click here</Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};
const user = (state) => ({ user: state.commonState.user });
export default connect(user, { REGISTRATION })(
  withRouter(withRegisterLoginState(RegisterForm))
);
