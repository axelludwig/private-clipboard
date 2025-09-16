import React, { useState, useEffect } from "react";

import NewClip from "../newclip/NewClip";
import Clips from "../clips/Clips";

function Frame(props) {
  const [isPrivate] = useState(props.context == "private" ? true : false);
  // const [childData, setChildData] = useState(null);

  return (
    <div className="frame-component">
      <NewClip private={isPrivate} />
      <Clips private={isPrivate} />
    </div>
  );
}

export default Frame;