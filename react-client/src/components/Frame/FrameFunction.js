import React, { useState, useEffect } from "react";

import NewClip from "../newclip/NewClipFunction";
import Clips from "../clips/Clips";

function Frame(props) {
  const [isPrivate] = useState(props.context == "private" ? true : false);
  const [childData, setChildData] = useState(null);

  return (
    <div className="frame-component">
      <NewClip private={isPrivate} passChildData={setChildData} />
      <Clips private={isPrivate} newClipProps={childData} />
    </div>
  );
}

export default Frame;
