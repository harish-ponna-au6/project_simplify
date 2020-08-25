import React from "react";
import RegisterForm from "../../components/common/RegisterForm";

const EditorRegister = () => {
  return (
    <div className="EditorRegister">
      <RegisterForm
        route="/editor/register"
        heading="Editor Register"
        userType="editor"
      />
    </div>
  );
};

export default EditorRegister;
