import React, { useState, useEffect } from "react";

import NewClip from "../newclip/NewClipFunction";
import Clips from "../clips/Clips";

function Frame(props) {
  const [isPrivate] = useState(props.context == "private" ? true : false);
  const [childData, setChildData] = useState("");

  useEffect(() => {
    if (childData != "") console.log(childData, '- Has changed')
  }, [childData]) // <-- here put the parameter to listen

  return (
    <div className="frame-component">
      <NewClip passChildData={setChildData} />
      <Clips private={isPrivate} newClipProps={childData} />
    </div>
  );
}

export default Frame;
