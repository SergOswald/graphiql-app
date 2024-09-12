const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Dummy users for demonstration (In production, you would query a database)
const users = [
  {
    id: 1,
    username: 'testuser',
    password: bcrypt.hashSync('password123', 8),  // Password is hashed for security
  },
];

// Route for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the password is correct
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Create a token with the user's ID
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

  // Send the token to the client
  res.json({ token });
});

// Middleware to verify the token for protected routes
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Protected route (requires token to access)
app.get('/protected-data', verifyToken, (req, res) => {
  res.json({ message: 'This is protected data', userId: req.userId });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
