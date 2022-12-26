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
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// when the date parameter is empty, returns current time in unix and utc 
app.get("/api/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: new Date().toUTCString()
  })
})

// sends a JSON object with two keys, unix and utc, based on a valid date that user requests  
app.get("/api/:date", (req, res) => {
  const d = req.params.date
  if (/^\d+$/.test(d)) {
    res.json({ unix: +d, utc: new Date(+d).toUTCString() })
  } else if (new Date(d) == 'Invalid Date') {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({
      unix: new Date(d).getTime(),
      utc: new Date(d).toUTCString()
    })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
