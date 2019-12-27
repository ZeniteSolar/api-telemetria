// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Config .env
dotenv.config();


// Set up bodyParser
app.use(bodyParser.json());
app.use(cors());

// Conect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    () => console.log('MongoDB Cennected!')
);

// Import Routes
const dataRoute = require('./routes/data');
const authRoute = require('./routes/auth');

app.use('/api/data', dataRoute);
app.use('/api/user', authRoute);

// Middlewares


// Routes
app.get('/', (req, res) => {
    res.send('We are online');
});

// Setup Server
app.listen(3000, () => console.log('Server Up!'));

