const express = require("express");
const axios = require("axios");
const mariadb = require("mariadb");
const path = require("path");
const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");
const fileUpload = require("express-fileupload");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const apiport = 8000;
const port = 8001;

const mime = require('mime-types')

// const cors = require('cors');

app.use(express.json());
io.origins("*:*");
// app.use(cors({
//   origin: '*'
// }));

app.use(express.json()); //Notice express.json middleware
app.use(fileUpload());

const pool = mariadb.createPool({
  // host: 'localhost',
  // port: 3306
  user: "root",
  password: "root",
  database: "clipboard",
  connectionLimit: 100,
});

io.on("connection", (socket) => {
  console.log("client connected");
  socket.on("test", () => {
    console.log("sockets ok");
    socket.emit("test2", "");
  });
  socket.on("update", () => {
    console.log("update");
    // socket.emit("test2", "");
  });
  socket.on("disconnect", () => console.log("disconnected" + "\n"));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/clips", function (req, res) {
  let private = req.query.access == "private" ? 1 : 0;
  let query =
    "SELECT * from Clips WHERE private = " + private + " ORDER BY time DESC";
  pool
    .getConnection()
    .then((conn) => {
      conn
        .query(query)
        .then((rows) => {
          var array = [];
          rows.map((t) => array.push(t));
          res.json(array);
          conn.release();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log("not connected");
      console.log(err);
    });
});

app.delete("/clips", function (req, res) {
  console.log(req.body);
  var query = "DELETE FROM Clips WHERE id = " + req.body.id + " ;";
  pool
    .getConnection()
    .then((conn) => {
      conn.query(query).then((row) => {
        res.json(row);
        console.log(row);
        conn.release();
      });
    })
    .catch((err) => {
      console.log("not connected");
      console.log(err);
    });
});

app.post("/clips", function (req, res) {
  var query =
    "INSERT INTO Clips(content, time, private, imagesrc)" +
    "values('" +
    req.body.content +
    "'  , CURRENT_TIMESTAMP ," +
    req.body.private +
    " ,'" +
    req.body.imagesrc +
    "')";
  pool
    .getConnection()
    .then((conn) => {
      conn.query(query).then((row) => {
        console.log(row.insertId);
        res.json({ id: row.insertId });
        conn.release();
      });
    })
    .catch((err) => {
      console.log("not connected");
      console.log(err);
    });
});

app.get("/", (req, res) => {
  console.log("ok");
  res.send("server ok");
});

app.get("/images/:id", function (req, res) {
  var fullpath = path.join(__dirname, "\\images\\", req.params.id);
  try {
    if (fs.existsSync(fullpath)) {
      res.set({ 'Content-Type': mime.lookup(fullpath) });
      res.sendFile(fullpath);
    }
  } catch { }
});

app.post("/image", function (req, res) {
  if (!req.files) return res.status(500).send({ msg: "file is not found" });
  var file = req.files.image;

  file.name = file.name.replace(/ /g, '_');
  file.mv(__dirname + "/images/" + file.name, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: err + "Error occured" });
    }
    // returing the response with file path and name
    console.log("file " + file.name + " downloaded");
    return res.send("file " + file.name + " uploaded");
  });
});

io.listen(port);
console.log("sockets listening on port ", port);

app.listen(apiport);
console.log("listening on port", apiport);
