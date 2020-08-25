import React, { useState } from "react";
import Input from "./Input";
import Loading from "./Loading";
import CommonNav from "./CommonNav";
import "../../styles/common/ForgotPassword.css";
import { FORGOT_PASSWORD } from "../../redux/actions/commonActions";
import { withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants } from "../../variants/commonVariants";

const ForgotPassword = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    mobile: "",
    otp: "",
    newPassword: "",
    submitted: false
  });
  const handleOnChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  return (
    <>
      <CommonNav />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="ForgotPassword d-flex justify-content-center"
      >
        {isLoading && <Loading />}
        <div className="card col-md-5 p-4 mt-5">
          <h4 className="text-center mb-5">
            <u>{props.heading} Forgot Password</u> ?{" "}
          </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              FORGOT_PASSWORD({
                user: { email: state.email, mobile: state.mobile },
                route: `/${props.userType}/forgot-password-otp`,
                setLoading,
                setState,
                state,
                reSubmitted: true
              });
            }}
          >
            {!state.submitted ? (
              <>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={state.email}
                  handleOnChange={handleOnChange}
                  placeholder="Enter email"
                />
                <Input
                  label="mobile"
                  name="mobile"
                  type="tel"
                  value={state.mobile}
                  handleOnChange={handleOnChange}
                  placeholder="Enter mobile number"
                />
                <div className="d-flex">
                  <button type="submit" className="btn ml-auto">
                    Send OTP
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Email : {state.email}</p>
                <p>Mobile : {state.mobile}</p>
                <div className="d-flex">
                  <button type="submit" className="btn ml-auto">
                    Resend OTP
                  </button>
                </div>
              </>
            )}
          </form>

          <br />
          {state.submitted && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                FORGOT_PASSWORD({
                  user: {
                    otp: state.otp,
                    email: state.email,
                    newPassword: state.newPassword
                  },
                  route: `/${props.userType}/forgot-password-reset`,
                  push: props.history.push,
                  to: `/${props.userType}/login`,
                  setLoading,
                  setState,
                  state
                });
              }}
            >
              <Input
                label="OTP"
                name="otp"
                type="tel"
                value={state.otp}
                handleOnChange={handleOnChange}
                placeholder="Enter OTP"
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={state.newPassword}
                handleOnChange={handleOnChange}
                placeholder="Enter New Password"
              />
              <div className="d-flex">
                <button type="submit" className="btn ml-auto">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default withRouter(ForgotPassword);
