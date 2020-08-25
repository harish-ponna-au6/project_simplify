import React from "react";
import ForgotPassword from "../../components/common/ForgotPassword";

const AdminForgotPassword = (props) => {
  return (
    <div className="AdminForgotPassword">
      <ForgotPassword heading="Admin" userType="admin" />
    </div>
  );
};

export default AdminForgotPassword;
