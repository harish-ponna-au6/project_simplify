import React from "react";
import ClientsOrEditors from "../../components/common/ClientsOrEditors";

const EditorAllClients = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorAllClients">
      <ClientsOrEditors userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorAllClients;
