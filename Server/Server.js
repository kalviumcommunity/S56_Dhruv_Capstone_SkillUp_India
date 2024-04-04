const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000; 
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });
  
app.get('/', (req, res) => {
    res.send('<h1>Hello, Future World!</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});