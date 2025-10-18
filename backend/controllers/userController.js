import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../lib/generateToken.js';
import Resume from '../models/Resume.js';

// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if required fields are present

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: 'Missing required fields. Please Try again!' });

    // check if user already exists
    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({ message: 'User already registered.' });

    //   crete new user
    //   hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //   return success message
    const token = generateToken(newUser._id);

    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: 'User created successfully.', newUser, token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error RegisterUser Controller: ' + error.message });
  }
};

// controller for user login
// POST: /api/users/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user  exists
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Invalid Credentials.' });

    //   check if password is correct
    if (!user.comparePassword(password))
      return res.status(401).json({ message: 'Invalid Credentials.' });

    //   return success message
    const token = generateToken(user._id);

    user.password = undefined;

    return res
      .status(200)
      .json({ message: 'Login successfully.', user, token });
  } catch (error) {
    console.log('Error LoginUser Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for getting user by id
// GET: /api/users/data

export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    //   check if user exist
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found.' });

    // return user
    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    console.log('Error getUserById Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const { userId } = req;

    // return user resumes
    const resumes = await Resume.find({ userId });

    return res.status(200).json({ resumes });
  } catch (error) {
    console.log('Error getUserResumes Controller: ', error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
