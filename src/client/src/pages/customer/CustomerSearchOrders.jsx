import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const CustomerSearchOrders = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="CustomerSearchOrders">
      <ViewOrders userType="customer" route={`${pathname}${search}`} />
    </div>
  );
};

export default CustomerSearchOrders;
