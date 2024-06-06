const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Skill = require('./Models/Skills');
const FormSubmission = require('./Models/Submission');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const { clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('./Models/User');

app.use(cors());
app.use(bodyParser.json());

// Function to fetch user list asynchronously
async function fetchUserList() {
  try {
    const userList = await clerkClient.users.getUserList();
    console.log('User List:', userList);
    return userList;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  }
}

// Function to save users to MongoDB
async function saveUsersToDB(userList) {
  try {
    const users = userList.data;

    if (!Array.isArray(users)) {
      throw new Error('User list is not an array');
    }

    await Promise.all(users.map(async (user) => {
      await User.findOneAndUpdate(
        { clerkUserId: user.id },
        user,
        { upsert: true, new: true }
      );
    }));
    console.log('User data saved to MongoDB');
  } catch (error) {
    console.error('Error saving user data to MongoDB:', error);
    throw error;
  }
}

// Function to fetch session list asynchronously
async function fetchSessionList(queryParams) {
  try {
    const sessionList = await clerkClient.sessions.getSessionList(queryParams);
    console.log(sessionList);
    return sessionList;
  } catch (error) {
    console.error('Error fetching session list:', error);
    throw error;
  }
}

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Define the POST route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    const { name, email, message, file, files, certainFile } = req.body;

    const newFormSubmission = new FormSubmission({
      name,
      email,
      message,
      file,
      files,
      certainFile
    });

    await newFormSubmission.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the GET route to fetch all form submissions
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await FormSubmission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to fetch skills
app.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to fetch users
app.get('/users', async (req, res) => {
  try {
    const userList = await fetchUserList();
    res.json(userList);
  } catch (error) {
    console.error('Error fetching users list', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to update user info
app.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserInfo = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: userId },
      updatedUserInfo,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route to fetch sessions
app.get('/sessions', async (req, res) => {
  try {
    const sessionList = await fetchSessionList(req.query);
    res.json(sessionList);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define route for homepage
app.get('/', async (req, res) => {
  try {
    res.send('Hello, Future World!');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server and connect to MongoDB
async function startServer() {
  try {
    await connectToDB();
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
