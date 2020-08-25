import React from "react";
import Profile from "../../components/common/Profile";

const EditorProfile = () => {
  return (
    <div className="EditorProfile">
      <Profile userType="editor" route="/editor/profile" />
    </div>
  );
};

export default EditorProfile;
