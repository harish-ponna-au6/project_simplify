import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const CustomerEditorOrders = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="CustomerEditorOrders">
      <ViewOrders userType="customer" route={`${pathname}${search}`} />
    </div>
  );
};

export default CustomerEditorOrders;
