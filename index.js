  // main file for tye server

const express = require("express");
const { validationResult, body } = require('express-validator');

//const fetch = require("cross-fetch");

const app = express();

const db = require("./sqlWrap");
const dbop = require("./sqloperate");


const bodyParser = require('body-parser');



app.use(bodyParser.json());
// make all the files in 'public' available 
app.use(express.static("public"));

app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/tiktokpets.html");
});

app.post("/videoData", [
    body('URL'),
    body('nickname'),
    body('username'),
  ], 
  async function(req, res) {
    // check validation
    if (validationResult(req).errors.length != 0) {
      res.status(500).end();
      return;
    }
  let text = req.body;
    let url = req.body.Url;
    let nickname = req.body.nickname;
    let username = req.body.userName;
    console.log("text", text);

    console.log(" send video to database", url, nickname, username);
    
    // check the total num of videos in the DB
    let num_of_Videos = await dbop.total_videos();
    if (num_of_Videos != null) {
      if (num_of_Videos >= 8) {
        console.log("Database full")
        res.send("Database is full");
      } else {
        // update most_recet video
        await dbop.update_video();
        // insert detalils to DB
        await dbop.send_video(url, nickname, username);
        let dbTable = await dbop.all_videos()
        console.log(dbTable);
        res.status(200).end();
      }
    }
});

//sending most recent video
app.get("/getMostRecent", async function(req, res) {
  console.log("most recent video");
  let result = await dbop.most_recent();
  console.log("most recent data", result);
  //console.log(typeof(res));
  res.json(result);

});



app.post("/vidDel", [
  body('nickname')
  ], 
  async function(req, res) {

   
  let text = req.body.nickname;
    //let url = req.body.Url;
    //let nickname = req.body.nickname;
    //let username = req.body.userName;
    console.log("text", text);

    console.log(" delete video", text);
    
    // check the total num of videos in the DB
    let num_of_Videos = await dbop.total_videos();
    if (num_of_Videos != null) {
      
        //await dbop.update_video();
        // insert detalils to DB
        await dbop.delete_video(text);
        let dbTable = await dbop.all_videos()
        console.log(dbTable);
        res.status(200).end();
      
    }
});





//app.post("/videoDel", (req, res) => {
  //console.log("in deletion");
  ///let nickname = req.body;
  //console.log(nickname);
  // let result = await dbop.delete_video(nickname);
   //let dbTable = await dbop.all_videos()
       // console.log("Deleted", dbTable);
 // res.send("video deleted");
   
  
//}
 // )

//send all the videos' nickname in the database


app.get("/getList", async function(req, res) {
  console.log("my videos");
  let result = await dbop.all_videos();
  console.log("my videos", result);
  //console.log(typeof(res));
  res.json(result);

});


app.get("/getNumofVideos", async function(req, res) {
    console.log("nums videos in database");
    let num_of_Videos = await dbop.total_videos();
    res.json(num_of_Videos);
});

// Need to add response if page not found!
app.use(function(req, res){ res.status(404); res.type('txt'); res.send('404 - File '+req.url+' not found'); });

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});