import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const EditorFilterOrders = (props) => {
  const {
    location: { pathname, search }
  } = props;

  return <ViewOrders userType="editor" route={`${pathname}${search}`} />;
};

export default EditorFilterOrders;
