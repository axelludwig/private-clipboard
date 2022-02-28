import React, { Component, useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { IconButton, Tooltip, Grid } from "@material-ui/core";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Clip.css";
import Image from "mui-image";

import { useSnackbar } from "notistack";

const axios = require("axios");
const mime = require("mime-types");

function Clip(props) {
  const [newClip, setNewClip] = useState(props.newClipProps);
  const [raw, setRaw] = useState(props.raw);
  const [id, setId] = useState(raw.id);
  const [content, setContent] = useState(raw.content);
  const [statePrivate, setstatePrivate] = useState(raw.private);
  const [postDate, setPostDate] = useState(raw.postDate);
  const [imagesrc, setImagesrc] = useState(raw.imagesrc);
  const [postDateMoment, setPostDateMoment] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    // constructor
    setPostDateMoment(moment(postDate).format("MMMM Do YYYY, h:mm:ss a"));
  }, [postDate]);

  const deleteButton = id => {
    props.deleteClipEvent(id);
    enqueueSnackbar(`Clip  ${id} deleted`);
  };

  const download = () => {
    window.location.replace("http://localhost:8000/images/" + imagesrc);
    enqueueSnackbar(`Image ${imagesrc} downloaded`);
  };

  const contentClick = () => {
    navigator.clipboard.writeText(content);
    enqueueSnackbar("Content copied to clipboard");
  };

  const imageClicked = async () => {
    const img = await fetch("http://localhost:8000/images/" + imagesrc);
    let imgBlob = await img.blob();
    const imageType = mime.lookup(imagesrc).toString();
    imgBlob = imgBlob.slice(0, imgBlob.size, imageType);
    try {
      navigator.clipboard.write([
        new window.ClipboardItem({ [imageType]: imgBlob })
      ]);
    } catch (error) {
      console.error(error);
    }
    enqueueSnackbar("Image copied to clipboard");
  };

  let imageFileName = imagesrc;
  let image,
    downloadButton = null;
  if (imageFileName != "undefined" && imageFileName != "null") {
    image = (
      <Image
        src={"http://localhost:8000/images/" + imageFileName}
        className="image"
        shift="top"
        distance="2rem"
        shiftDuration={320}
        onClick={() => imageClicked()}
      />
    );
    downloadButton = (
      <Tooltip title="Download image">
        <IconButton onClick={() => download(imageFileName)}>
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <div className="clip" id={id}>
      <Grid className="grid" container spacing={0}>
        <Grid item xs={8}>
          <Tooltip title="Copy content to clipboard">
            <div onClick={() => contentClick()} className="content">
              {content}
            </div>
          </Tooltip>
        </Grid>
        <Grid className="date" item xs={2}>
          <Tooltip title={postDateMoment}>
            <Moment format="DD/MM/YYYY">{postDate}</Moment>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          {downloadButton}
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteButton(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {image}
    </div>
  );
}

export default Clip;
