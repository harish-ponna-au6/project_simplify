import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const EditorViewAllOrder = (props) => {
  const {
    match: { url }
  } = props;
  return <ViewOrders userType="editor" route={url} />;
};

export default EditorViewAllOrder;
