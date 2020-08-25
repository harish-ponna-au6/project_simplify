import React from "react";
import CustomersOrEditors from "../../components/common/CustomersOrEditors";

const CustomerHome = () => {
  return (
    <div className="CustomerHome">
      <CustomersOrEditors userType="customer" route="/customer/all-editors" />
    </div>
  );
};

export default CustomerHome;
