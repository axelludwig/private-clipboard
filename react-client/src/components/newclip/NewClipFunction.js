import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import "./NewClip.css";

import { Switch, Button, IconButton, Checkbox, Grid } from "@material-ui/core";
import { alpha, styled } from "@mui/material/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { FormGroup, FormControlLabel } from "@mui/material";
// const socket = openSocket('http://localhost:8001', { transports: ['websocket'] });

// const socket = socketIOClient("http://localhost:8001");

// socket.on("connection", (socket) => {
//   console.log("client connected");
//   socket.emit("update", "");
//   socket.on("test", () => {
//     console.log("sockets ok");
//     socket.emit("test2", "");
//   });
//   socket.on("disconnect", () => console.log("disconnected"));
// });

function NewClip(props) {
  const [clipText, setClipText] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [privateText, setPrivateText] = useState("public");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [buttonText, setButtonText] = useState("Upload File!");
  const [backupFile, setBackupFile] = useState(null);
  const [fileName, setFileName] = useState();
  const [newClip, setNewClip] = useState(props.newClipProp);

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#a366ff",
      "&:hover": {
        backgroundColor: alpha("#a366ff", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#a366ff",
    },
  }));

  const handleSubmit = () => {
    if (null != selectedFile) uploadHandler();
    var json = {
      content: clipText,
      private: isPrivate,
      imagesrc: fileName,
    };
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        json.id = res.id;
        // setNewClip(json);
        props.passChildData(json);
      })
      .catch((error) => {
        console.error(error);
      });
    deleteImage();
  };

  const handleCheck = (e) => {
    setIsPrivate(e.target.checked);
    setPrivateText(e.target.checked ? "private" : "public");
  };

  const debug = () => {
    // console.log(selectedFile);    
  };

  const handleChange = (event) => {
    setClipText(event.target.value);
  };

  const deleteImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setButtonText("Upload File");
  };

  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setBackupFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
    setButtonText(event.target.files[0].name);
    setFileName(event.target.files[0].name);
  };

  const uploadHandler = () => {
    const config = {
      onUploadProgress: (progressEvent) => {
        let progress =
          Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%";
      },
    };
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("image", selectedFile, selectedFile.name);
    axios.post("http://localhost:8000/image", formData, config);
  };

  let image, deleteButton;

  if (null != imagePreview) {
    image = <img className="uploaded" src={imagePreview} />;
    deleteButton = (
      <IconButton onClick={deleteImage} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    );
  }

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => { });

  return (
    <div className="newClip-component">
      <div className="imageUpload">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Button variant="contained" component="label" disableElevation>
              {buttonText}
              <input
                type="file"
                hidden
                onClick={(event) => (event.target.value = null)}
                onChange={fileChangedHandler}
              />
            </Button>
            {deleteButton}
          </Grid>
          <Grid item xs={9}>
            {image}
          </Grid>
        </Grid>
      </div>

      <input
        onChange={handleChange}
        value={clipText}
        type="text"
        placeholder="text content"
      />
      <PinkSwitch onChange={handleCheck} checked={isPrivate} />
      <div>
        {privateText}
      </div>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" onClick={debug}>
        debug
      </Button>
    </div>
  );
}

export default NewClip;
