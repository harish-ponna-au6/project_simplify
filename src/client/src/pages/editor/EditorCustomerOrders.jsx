import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const EditorCustomerOrders = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorCustomerOrders">
      <ViewOrders userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorCustomerOrders;
