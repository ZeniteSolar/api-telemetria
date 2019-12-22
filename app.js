const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

// Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

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

