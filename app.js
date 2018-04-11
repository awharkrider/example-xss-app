// loading dependency from node_modules (specified in package.json)
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

// allows express to see POST bodies
app.use(bodyParser.urlencoded(" "));
app.use(bodyParser.json());

// allows app to be used across domains
app.use(cors());

//shows the requests in the terminal/console
app.use(logger("dev"));

//creating fake database
var user1 = { user: "brian" };
var user2 = { user: "aaron" };

var data = [user1, user2];

//hosting web page at localhost:3000
app.use("/", express.static("static"));

/**
 * GET users endpoint
 */
app.get("/users", function(req, res) {
  res.json(data);
  return;
});

/**
 * POST users endpoint.
 * Requires JSON w/ user property: {"user": "yourmom"}
 * Require Content-Type: application/json - header
 */
app.post("/users", function(req, res) {
  if (req.body.user == null) {
    res.statusCode = 400;
    res.json({ error: "no user field in json" });
    return;
  } else if (req.header("Content-Type") != "application/json") {
    res.statusCode = 400;
    res.json({ error: "no Content-Type header (application/json" });
    return;
  } else {
    data.push({ user: req.body.user });
    res.statusCode = 200;
    res.json({ result: "success" });
    return;
  }
});

/**
 * Sets the app to run on port 3000
 */
app.listen(3000, function() {
  console.log("xss example app started");
});
