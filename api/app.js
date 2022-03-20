const express = require('express');
var bodyParser = require('body-parser')

const User = require('./models/user');


const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const soupRoutes = require('./routes/soup');



app.use('/api/soup', soupRoutes);
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  
module.exports = app;