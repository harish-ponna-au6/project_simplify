import React from "react";
import ForgotPassword from "../../components/common/ForgotPassword";

const EditorForgotPassword = (props) => {
  return (
    <div className="EditorForgotPassword">
      <ForgotPassword heading="Editor" userType="editor" />
    </div>
  );
};

export default EditorForgotPassword;
