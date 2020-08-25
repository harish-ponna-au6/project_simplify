import React from "react";
import ViewOrders from "../../components/common/ViewOrders";

const EditorSearchOrders = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorSearchOrders">
      <ViewOrders userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorSearchOrders;
