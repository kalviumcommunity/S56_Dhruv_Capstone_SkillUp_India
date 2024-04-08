const express = require('express');
const mongoose = require('mongoose');
const Skill = require('./Models/Skills');
require('dotenv').config();
const port = process.env.PORT || 3000; 
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
app.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

connectToDB();
app.get('/', async (req, res) => {
  try {
    res.send('<h1>Hello, Future World!</h1>');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
