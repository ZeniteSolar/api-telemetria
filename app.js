const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

// Import Routes
const dataRoute = require('./routes/data');

app.use('/data', dataRoute);

// Middlewares


// Routes
app.get('/', (req, res) => {
    res.send('We are online');
});

// Conect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => console.log('Conect to DB')
);

app.listen(3000);

