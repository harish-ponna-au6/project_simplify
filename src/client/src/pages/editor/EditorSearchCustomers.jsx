import React from "react";
import CustomersOrEditors from "../../components/common/CustomersOrEditors";

const EditorSearchCustomers = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorSearchCustomers">
      <CustomersOrEditors userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorSearchCustomers;
