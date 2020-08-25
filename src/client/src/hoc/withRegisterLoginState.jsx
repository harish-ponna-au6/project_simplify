import React, { useState } from "react";

const withRegisterLoginState = (Component) => {
  return (props) => {
    const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      mobile: "",
      officeName: "",
      address: ""
    });
    const handleOnChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };
    return (
      <Component {...props} state={state} handleOnChange={handleOnChange} />
    );
  };
};

export { withRegisterLoginState };
