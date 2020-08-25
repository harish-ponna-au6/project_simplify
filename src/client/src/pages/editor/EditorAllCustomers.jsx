import React from "react";
import CustomersOrEditors from "../../components/common/CustomersOrEditors";

const EditorAllCustomers = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorAllCustomers">
      <CustomersOrEditors userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorAllCustomers;
