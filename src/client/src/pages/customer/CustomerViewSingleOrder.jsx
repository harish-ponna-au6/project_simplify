import React from "react";
import ViewSingleOrder from "../../components/common/ViewSingleOrder";

const CustomerViewSingleOrder = (props) => {
  const {
    match: { url }
  } = props;
  return (
    <div className="CustomerViewSingleOrder">
      <ViewSingleOrder userType="customer" url={url} />
    </div>
  );
};

export default CustomerViewSingleOrder;
