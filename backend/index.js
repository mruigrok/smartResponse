const express  = require('express');
var bodyParser = require("body-parser");
const app      = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS, to make our server public even when using different location
 app.use((req, res, next)=> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
}); 

//grab our routes in users and interface
const geo = require('./routes/geo'); 

require('dotenv').config(); //grab our environment variables


app.use('/', geo); //set our routes to the "/" location

//constantly fetch data
const audio = require('./audio/fetchAudio');
const auth = require('./auth').getAccessToken();
setInterval(() => audio.fetchAudio(), 10000);

app.listen(process.env.PORT, function() {
    console.log((new Date).getTime())
    console.info("==> 🌎 Peep port %s.", process.env.PORT);
})
