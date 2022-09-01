import React, { Component, useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import { IconButton, Tooltip, Grid } from "@material-ui/core";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Clip.css";
import Image from "mui-image";

import { useSnackbar } from "notistack";

import axios from "axios";
import mime from "mime-types";
import saveAs from 'file-saver'

import { copyImageToClipboard } from 'copy-image-clipboard'

function Clip(props) {
  const [newClip, setNewClip] = useState(props.newClipProps);
  const [raw, setRaw] = useState(props.raw);
  const [id, setId] = useState(raw.id);
  const [content, setContent] = useState(raw.content);
  const [statePrivate, setstatePrivate] = useState(raw.private);
  const [postDate, setPostDate] = useState(raw.time);
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
    saveAs('http://localhost:8000/images/' + imagesrc, imagesrc)
    enqueueSnackbar(`Image ${imagesrc} downloaded`);
  };

  const contentClick = () => {
    navigator.clipboard.writeText(content);
    enqueueSnackbar("Content copied to clipboard");
  };

  const imageClicked = async () => {
    copyImageToClipboard(
      "http://localhost:8000/images/" + imagesrc,
    )
      .then(() => {
        enqueueSnackbar("Image copied to clipboard");
      })
      .catch((e) => {
        console.log('Error: ', e.message)
      })
  };

  let imageFileName = imagesrc;
  let image,
    downloadButton;
  if (
    imageFileName != "undefined" &&
    imageFileName !== undefined &&
    imageFileName != "null"
  ) {
    image = (
      <Tooltip title="Copy image to clipboard">
        <div>
          <Image
            src={"http://localhost:8000/images/" + imageFileName}
            className="image"
            easing="linear"
            distance="2rem"
            shiftDuration={160}
            onClick={() => imageClicked()}
          />
        </div>
      </Tooltip>
    );
    downloadButton = (
      <Tooltip title="Download image">
        <IconButton onClick={download}>
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <div className="clip" id={id}>
      <Grid className="grid" container direction="row"
        justifyContent="space-between"
        alignItems="flex-start" spacing={4}>
        <Grid item xs={8}>
          <Tooltip title="Copy content to clipboard">
            <div onClick={() => contentClick()} className="content">
              {content}
            </div>
          </Tooltip>
        </Grid>
        <Grid className="date" item xs={2}>
          <Tooltip title={postDateMoment}>
            <Moment format="DD/MM/YY">{postDate}</Moment>
          </Tooltip>
        </Grid>
        <Grid xs={1}>
          {downloadButton}
        </Grid>
        <Grid xs={1}>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteButton(id)}>
              <DeleteIcon sx={{ justifyContent: 'center' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {image}
    </div>
  );
}

export default Clip;
