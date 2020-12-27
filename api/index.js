const express = require("express");
const axios = require("axios");
const mariadb = require('mariadb');
const fs = require('fs')
const http = require("http");
const socketIo = require("socket.io");
const fileUpload = require('express-fileupload');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const apiport = 8000;
const port = 8001;


app.use(express.json());
io.origins('*:*');

app.use(fileUpload());

const pool = mariadb.createPool({
  // host: 'localhost',
  user: 'clip',
  password: 'board*',
  database: 'clipboard',
  connectionLimit: 100
  // port: 3306 
});

io.on("connection", socket => {
  console.log("client connected")
  socket.on('test', () => {
    console.log("sockets ok")
    socket.emit("test2", '');
  })
  socket.on("disconnect", () => console.log("disconnected"));

});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/clips', function (req, res) {
  pool.getConnection()
    .then(conn => {
      conn.query("SELECT * from Clips")
        .then((rows) => {
          var array = [];
          rows.map(t => array.push(t))
          res.json(array);
        })
        .catch(err => console.log(err))
    }).catch(err => {
      console.log('not connected')
      console.log(err)
    });
});

app.post('/clips', function (req, res) {
  console.log(req.body);
  var query = "INSERT INTO Clips(content, time, private)"
    + "values('" + req.body.content + "'  , CURRENT_TIMESTAMP ," + req.body.private + ")"
  console.log(query)
  pool.getConnection()
    .then(conn => {
      conn.query(query)
        .then((row) => {
          res.json(row);
          console.log(row)
        })
    })
    .catch(err => {
      console.log('not connected')
      console.log(err)
    });

})

app.get('/', (req, res) => {
  console.log('ok')
  res.send('server ok')
})

app.get('/image', function (req, res) {
  var jpg = __dirname + '\\images\\' + req.body.id + '.jpg';
  var png = __dirname + '\\images\\' + req.body.id + '.png';
  var found = false;
  try {
    if (fs.existsSync(jpg)) {
      found = true;
      res.sendFile(jpg)
    }
  } catch { };
  if (!found) {
    try {
      if (fs.existsSync(png)) res.sendFile(png)
    } catch { };
  }
})

app.post('/image', function (req, res) {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }

  var file = req.files.image;

  file.mv(__dirname + '/images/' + file.name, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    console.log('file ' + file.name + ' downloaded');
    return res.send('file ' + file.name + ' uploaded');
  });
})

io.listen(port);
console.log('sockets listening on port ', port);

app.listen(apiport);
console.log('listening on port', apiport)