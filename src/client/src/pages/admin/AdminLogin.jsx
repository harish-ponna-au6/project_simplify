import React from "react";
import LoginForm from "../../components/common/LoginForm";

const AdminLogin = () => {
  return (
    <div className="AdminLogin">
      <LoginForm route="/admin/login" heading="Admin Login" userType="admin" />
    </div>
  );
};

export default AdminLogin;
