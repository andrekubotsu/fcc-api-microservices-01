// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// first without any parameters, it returns current date both unix and utc

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

// second, with the date_string parameter
app.get("/api/timestamp/:date", (req, res) => {
  const { date } = req.params; // to get the param from url

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(date)) {
    let dateInt = parseInt(date);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(date);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
