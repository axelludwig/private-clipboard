import React, { useState } from "react";
import axios from "axios";


import "./NewClip.css";

import { Switch, Button, IconButton, Grid, Input, TextField } from "@material-ui/core";
import { alpha, styled } from "@mui/material/styles";
import DeleteIcon from "@material-ui/icons/Delete";
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

  const CustomSwitch = styled(Switch)({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#544CFF !important",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0)"
      }
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#544CFF !important"
    }
  });

  const handleSubmit = () => {
    if (null != selectedFile) uploadHandler();
    var json = {
      content: clipText,
      private: isPrivate,
      imagesrc: fileName
    };
    fetch("http://localhost:8000/clips", {
      crossDomain: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        json.id = res.id;
        // setNewClip(json);
        console.log(json);
        props.passChildData(json);
      })
      .catch(error => {
        console.error(error);
      });
    deleteImage();
  };

  const handleCheck = e => {
    setIsPrivate(e.target.checked);
    setPrivateText(e.target.checked ? "private" : "public");
  };

  const debug = () => {
    // console.log(selectedFile);
  };

  const handleChange = event => {
    setClipText(event.target.value);
  };

  const deleteImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setButtonText("Upload File");
  };

  const fileChangedHandler = event => {
    const file = event.target.files[0];
    let newFileName = file.name.replace(/ /g, "_");
    // setBackupFile(file);
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setButtonText(newFileName);
    setFileName(newFileName);
  };

  const uploadHandler = () => {
    const config = {
      onUploadProgress: progressEvent => {
        let progress =
          Math.round((progressEvent.loaded / progressEvent.total) * 100) + "%";
      }
    };
    console.log(selectedFile);
    let newFileName = selectedFile.name.replace(/ /g, "_");
    const formData = new FormData();
    formData.append("image", selectedFile, newFileName);
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
    <div className="newclipcomponent">
      <Grid container>
        <div className="imageUpload">
          <Grid item xs={12}>
            <Button variant="contained" component="label" disableElevation>
              {buttonText}
              <Input
                type="file"
                hidden
                onClick={event => (event.target.value = null)}
                onChange={fileChangedHandler}
              />
            </Button>
            {deleteButton}
            {/* </Grid>
            <Grid item xs={9}> */}

          </Grid>
        </div>

        <TextField
          className="textfield"
          onChange={handleChange}
          value={clipText}
          type="text"
          placeholder="text content"
        />
        <CustomSwitch
          onChange={handleCheck}
          checked={isPrivate}
        />
      </Grid>


      <Grid container>
        <Grid item xs={12}>
          <Button
            className="buttonSubmit"
            variant="contained"
            onClick={handleSubmit}
            disableElevation
          >
            Submit
          </Button>
          {/* {privateText} */}
          {/* <Button variant="contained" onClick={debug}>debug</Button> */}
        </Grid>
      </Grid>
      {image}

    </div >
  );
}

export default NewClip;
