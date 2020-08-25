import React from "react";
import RegisterForm from "../../components/common/RegisterForm";

const EditorCreateAccount = () => {
  return (
    <div className="EditorCreateAccount">
      <RegisterForm
        route="/editor/create-customer-account"
        heading="Create Customer Account"
      />
    </div>
  );
};

export default EditorCreateAccount;
