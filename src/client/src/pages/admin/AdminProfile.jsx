import React from "react";
import Profile from "../../components/common/Profile";

const AdminProfile = () => {
  return (
    <div className="AdminProfile">
      <Profile userType="admin" route="/admin/profile" />
    </div>
  );
};

export default AdminProfile;
