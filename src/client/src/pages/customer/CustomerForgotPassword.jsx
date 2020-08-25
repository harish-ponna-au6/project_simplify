import React from "react";
import ForgotPassword from "../../components/common/ForgotPassword";

const CustomerForgotPassword = (props) => {
  return (
    <div className="CustomerForgotPassword">
      <ForgotPassword heading="Customer" userType="customer" />
    </div>
  );
};

export default CustomerForgotPassword;
