import React from "react";
import LoginForm from "../../components/common/LoginForm";

const CustomerLogin = () => {
  return (
    <div className="CustomerLogin">
      <LoginForm
        route="/customer/login"
        heading="Customer Login"
        userType="customer"
      />
    </div>
  );
};

export default CustomerLogin;
