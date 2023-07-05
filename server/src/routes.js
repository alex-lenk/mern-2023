import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth, { validate } from './middleware.js';
import User from './models/User.js';


const router = express.Router();

router.post('/register', [
  check('email').isEmail(),
  check('password').isLength({ min: 8 }),
], validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
});

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  res.json(user);
});

router.put('/profile', auth, async (req, res) => {
  const { email } = req.body;

  // Check if email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id !== req.user.userId) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Update user
  const user = await User.findByIdAndUpdate(req.user.userId, { email }, { new: true }).select('-password');
  res.json(user);
});

export default router;
