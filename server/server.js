const express = require('express')
const app = express()
const fs = require("fs");
var cors = require('cors'); //installed CORS handling https://stackoverflow.com/questions/50968152/cross-origin-request-blocked-with-react-and-express
 
const bodyParser = require('body-parser');
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      
// setup tutorial here - https://www.youtube.com/watch?v=w3vs4a03y3I

const userinfo = fs.readFileSync("userinfo.json");
app.use(express.json()); // middleware that coverts the body to json
app.use(cors())

app.get("/api", (req, res) => { //  takes in the userinfo and displays it at /api
    try {
      res.send(`${userinfo}`);
    } catch (error) {
      res.send(`There was an error: ${error}`);
    }
  });

  // utility function - gets person data, and creates the file if it doesn't exist
function getUserInfo() {
    try {
      const userinfo = fs.readFileSync("userinfo.json"); // read userinfo.json
      return JSON.parse(userinfo);// parse the json
    } catch (e) {
      // file non-existent
      fs.writeFileSync("userinfo.json", "[]");
      return [];
    }
  }

// posts new info to api
app.post("/api", (req, res) => { // post the userinfo to /api
    let userinfo = JSON.parse(fs.readFileSync("userinfo.json", "utf8"));
    if (!userinfo) {
      getUserInfo(); // if no info returned run the getUserINfo function
    }
  
    const newInfo = req.body;

    userinfo[0].user.push(newInfo); // pushes new info to the array / object
    fs.writeFileSync("userinfo.json", JSON.stringify(userinfo));
    res.send(userinfo);
  });

  // put request to edit an item 
  app.put("/api/:title", (req, res) => {
    const title = req.params.title;
    const newInfo = req.body;
    const userinfo = getUserInfo();
  
    const itemIndex = userinfo[0].user.findIndex(item => item.title === title);
    if (itemIndex === -1) {
      res.send({message: "Information not found"});
      return;
    }
  
    userinfo[0].user[itemIndex] = { ...userinfo[0].user[itemIndex], ...newInfo };
    fs.writeFileSync("userinfo.json", JSON.stringify(userinfo));
  
    res.send({message: "Successful update"});
  });
  
  
///////////// deletes an item based on title

function deleteObject(array, title) {
    const userArray = array[0].user; // defines item structure in array
    const objectIndex = userArray.findIndex((user) => user.title === title); // finds object title
    if (objectIndex !== -1) {
      userArray.splice(objectIndex, 1); // splices object
      return true;
    }
    return false;
  }
  
  
  app.delete("/api/:title", (req, res) => {
    const title = req.params.title;
    const data = getUserInfo(); // passes the function to the DELETE handler 
    if (deleteObject(data, title)) {
      fs.writeFileSync("userinfo.json", JSON.stringify(data));
      res.send({message: "Success"});
    } else {
      res.send({message: "Title not found"});
    }
  });


app.listen(3001,() => console.log (`Server started on Port 3001`))


// error handling for wrong URL

app.get("*", function (req, res, next) {
    let err = new Error(
      `Sorry! Can’t find that resource. Please check your URL ${req.originalUrl}`
    ); // Tells us which IP tried to reach a particular URL
    err.statusCode = 404;
    err.shouldRedirect = true; //New property on err so that our middleware will redirect
    next(err);
  });
  