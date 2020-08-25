import React from "react";
import Profile from "../../components/common/Profile";

const CustomerProfile = () => {
  return (
    <div className="CustomerProfile">
      <Profile userType="customer" route="/customer/profile" />
    </div>
  );
};

export default CustomerProfile;
