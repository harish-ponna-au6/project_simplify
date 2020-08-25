import React from "react";
import CustomersOrEditors from "../../components/common/CustomersOrEditors";

const AdminFilterEditors = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="AdminFilterEditors">
      <CustomersOrEditors userType="admin" route={`${pathname}${search}`} />
    </div>
  );
};

export default AdminFilterEditors;
