import React from "react";
import LoginForm from "../../components/common/LoginForm";

const EditorLogin = () => {
  return (
    <div className="EditorLogin">
      <LoginForm
        route="/editor/login"
        heading="Editor Login"
        userType="editor"
      />
    </div>
  );
};

export default EditorLogin;
