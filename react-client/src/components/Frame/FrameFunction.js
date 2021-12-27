import React, { useState } from "react";

import NewClip from "../newclip/NewClipFunction";
import Clips from "../clips/Clips";

function Frame(props) {
  const [isPrivate] = useState(props.context == "private" ? true : false);

  return (
    <div className="frame-component">
      <NewClip />
      <Clips private={isPrivate} />
    </div>
  );
}

export default Frame;
