import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Clip from "../clip/Clip";
import "./Clips.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CustomScroller from "react-custom-scroller";
import CustomScroll from "react-custom-scroll";
import Divider from "../Divider/Divider";
import { httpService } from '../../services/httpService';

import { useData } from '../../services/dataContext';
import { v4 as uuidv4 } from 'uuid';

const socket = socketIOClient("http://localhost:8001");

const Clips = (props) => {
  // const [clips, setClips] = useState([]);
  // const [lastAddedClip, setLastAddedClip] = useState(null);

  // const { clips, updateClips } = useData();

  useEffect(() => {
    document.body.style.backgroundColor = "#212121";

    const updateHandler = () => {
      console.log("updated");
    };

    fetchClips();

    socket.on("update", updateHandler);
    return () => {
      socket.off("update", updateHandler);
    };
  }, []);


  useEffect(() => {
    console.log('Clips has been updated', clips);
  }, [clips]);



  const fetchClips = () => {
    let access = props.private ? "private" : "public";
    httpService.getClips(access).then(json => {
      updateClips(json);
    })
      .catch(error => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   if (props.newClipProps && props.newClipProps.private === props.private && props.newClipProps !== lastAddedClip) {
  //     updateClips(props.newClipProps);
  //     setLastAddedClip(props.newClipProps);
  //   }
  // }, [props.newClipProps, props.private, lastAddedClip]);

  const deleteClip = (id) => {
    httpService.deleteClip(id).then(() => {
      // setClips(clips.filter(item => item.id !== id));
    });
  };



  // const updateClips = (newClip) => {
  //   if (newClip != null) {
  //     // setClips(prevClips => [newClip, ...prevClips]);
  //   }
  // };

  const deleteClipEvent = (id) => {
    deleteClip(id);
  };



  const domClips = clips.map((c, index) => (
    <React.Fragment key={uuidv4()}>
      <Clip deleteClipEvent={deleteClipEvent} raw={c} />
      {index !== clips.length - 1 && <Divider />}
    </React.Fragment>
  ));

  return (
    <div className="clips">
      {domClips}
    </div>
  );

};

export default Clips;