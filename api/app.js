const express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
const MONGO_LINK = process.env.MONGO_LINK;

const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const soupRoutes = require('./routes/soup');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

mongoose.connect(MONGO_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => { // il existe un module express-cors pour faire tout ça
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  next();
});
app.use('/api/soup', soupRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/order', orderRoutes);


module.exports = app;