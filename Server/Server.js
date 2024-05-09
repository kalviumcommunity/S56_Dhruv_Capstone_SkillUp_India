const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Skill = require('./Models/Skills');
require('dotenv').config();
const port = process.env.PORT || 3000;
const app = express();
const { clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('./Models/User');

// Middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Function to fetch user list asynchronously
async function fetchUserList() {
  try {
    const userList = await clerkClient.users.getUserList();
    console.log('User List:', userList);
    return userList; // Returning the user list
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error; 
  }
}

// Function to save users to MongoDB
async function saveUsersToDB(userList) {
  try {
    // Extracting the data array from the userList object
    const users = userList.data;

    if (!Array.isArray(users)) {
      throw new Error('User list is not an array');
    }

    // Iterating through the user list and save each user to MongoDB
    await Promise.all(users.map(async (user) => {
      await User.findOneAndUpdate(
        { clerkUserId: user.id }, // Search criteria
        user, // Data to update or insert
        { upsert: true, new: true } // Options: upsert if not found, return updated document
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
    return sessionList; // Returning the session list
  } catch (error) {
    console.error('Error fetching session list:', error);
    throw error; 
  }
}

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

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
    res.json(userList); // Sending the user list as JSON response
  } catch (error) {
    console.error('Error fetching users list', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Define route to update user info
app.put('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserInfo = req.body; // Updating the user information from request body

    // Update the user in the database
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: userId }, // Search criteria
      updatedUserInfo,  // Data to update
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
    const sessionList = await fetchSessionList(req.query); // Passing the query parameters if any
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

// Call the asynchronous function to start the server and connect to MongoDB
startServer();
