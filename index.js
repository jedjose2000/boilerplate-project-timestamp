
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// app.get("/api/2015-12-25", function(req, res) {
//   res.json({ greeting: 'hello API' });
// });

app.get("/api", function(req, res) {
  date = new Date();
  unixTime = date.getTime();
  dateNow = date.toUTCString();
  timeNow = unixTime;
  res.json({ unix: timeNow, utc: dateNow });
});





app.get('/api/:input', function(req, res, next) {
  const { input } = req.params;
  let date;
  let unixTime;

  if (!isNaN(input)) {
    // If the input is a number, assume it's a Unix timestamp in milliseconds
    date = new Date(parseInt(input, 10));
    unixTime = date.getTime();
  } else {
    // If the input is a date string, parse it
    date = new Date(input);
    unixTime = date.getTime();
  }

  if (!isNaN(unixTime) && isFinite(unixTime)) {
    req.date = date.toUTCString();
    req.time = unixTime;
  } else {
    req.time = null; // Set req.time to null for invalid dates
  }
  next();
}, function(req, res) {
  if(req.time === null){
    res.json({ error: "Invalid Date" });
  }else{
    res.json({ unix: req.time, utc: req.date });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
