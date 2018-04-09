const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gameRoutes = require('./routes/games');

const app = express();
const config = require('./config');

let game = require('./model/games');

app.use(bodyParser.json());
app.use('/games', gameRoutes);

mongoose.connect('mongodb://localhost:27017', () => {
    console.log('Connected to Mongo');
})

app.listen(config.port, () => {
    console.log('listening on ' + config.port);
})