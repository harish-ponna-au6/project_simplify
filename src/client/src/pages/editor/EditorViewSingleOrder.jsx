import React from "react";
import ViewSingleOrder from "../../components/common/ViewSingleOrder";

const EditorViewSingleOrder = (props) => {
  const {
    match: { url }
  } = props;
  console.log(props);
  return (
    <div className="EditorViewSingleOrder">
      <ViewSingleOrder userType="editor" url={url} />
    </div>
  );
};

export default EditorViewSingleOrder;
