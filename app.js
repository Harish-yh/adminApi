const express = require('express');
const app = express();
var  bodyParser = require('body-parser');
var  cors = require('cors');
const routes = require('./routes/route');
const path = require('path');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));


 

app.use('/api',routes);

var port = 4000;


app.listen(port,'192.168.6.57',()=>{
    console.log('API is runnning at ' + port)
})