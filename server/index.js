// start point in server-side 
const express = require('express');
const app = express();
const path = require("path");

// get body-parser 
const bodyParser = require('body-parser');
//  get cookie-parser 
const cookieParser = require('cookie-parser');
// Cookie: client, DB(MongoDB): server

// middleware
const{ auth } = require('./middleware/auth')
// configuration
const config = require('./configuration/key');

// give body-parser options: client -> analyze -> server
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// get json data
// application/jason
app.use(bodyParser.json());
app.use(cookieParser());

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Cookie: client, DB(MongoDB): server
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected! :)')).catch(err => console.log(err))

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));
app.use('/api/blog', require('./routes/blog'));

// < --------- Serve static assets if in production ---------> //

if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// < ------------- Serverside Port ----------------> //

const port = 5001

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})