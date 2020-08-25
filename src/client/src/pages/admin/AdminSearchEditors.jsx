import React from "react";
import CustomersOrEditors from "../../components/common/CustomersOrEditors";

const AdminSearchEditors = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="AdminSearchEditors">
      <CustomersOrEditors userType="admin" route={`${pathname}${search}`} />
    </div>
  );
};

export default AdminSearchEditors;
