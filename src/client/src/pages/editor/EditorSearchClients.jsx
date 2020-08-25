import React from "react";
import ClientsOrEditors from "../../components/common/ClientsOrEditors";

const EditorSearchClients = (props) => {
  const {
    location: { pathname, search }
  } = props;
  return (
    <div className="EditorSearchClients">
      <ClientsOrEditors userType="editor" route={`${pathname}${search}`} />
    </div>
  );
};

export default EditorSearchClients;
