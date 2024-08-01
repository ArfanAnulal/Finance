import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Record from '../models/Record.js';

export const signup = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if(username){
  try {

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword});

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {

    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }}else{
    res.status(400).json({ message: 'Username is required' });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const users = async (req, res) => {
  if(req.userRole != 'admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

export const updateuser = async (req, res) => {
  if(req.userRole != 'admin') return res.status(403).json({ message: 'Unauthorized' });

  const { id, role,username,email,password } = req.body;
  // check duplicate username
  const existing= await User.findOne({ username });
  if (existing) return res.status(400).json({ message: 'Username already exists' });
  if(!id) return res.status(400).json({ message: 'User ID is required' });
  try {
    await User.findByIdAndUpdate(id, { role,username,email,password });
    res.status(200).json({ message: 'User updated successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Something went wrong',error });
  }
}
export const deleteuser = async (req, res) => {
  if(req.userRole != 'admin') return res.status(403).json({ message: 'Unauthorized' });

  const { id } = req.body;
  if(!id) return res.status(400).json({ message: 'User ID is required' });
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}
export const viewUserExpense = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: 'User ID is required' });

  try {
    // Find the user and populate their records
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const records = await Record.find({ userId: id });

    const response = {
    
      userId: user._id,
      username: user.username,
      // Assuming email is part of the user schema
      email: user.email || 'N/A', // Add the email field if it exists in your schema
      expenses: records.map(record => ({
        id: record.id,
        amount: record.amount,
        category: record.category,
        date: record.date,
        description: record.description
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};
export const updateUserExpense = async (req, res) => {
  const { id, amount, category, date, description } = req.body
  if(!id) return res.status(400).send('Record ID is required');
  Record.findByIdAndUpdate(id, {
      amount,
      category,
      date,
      description
  })
      .then(() => res.send('Record updated successfully!'))
      .catch(err => res.status(400).send('Error updating record: ' + err));
}
export const deleteUserExpense = async (req, res) => {
  const { id } = req.body;
  if(!id) return res.status(400).send('Record ID is required');
  Record.findByIdAndDelete(id)
      .then(() => res.send('Record deleted successfully!'))
      .catch(err => res.status(400).send('Error deleting record: ' + err));
}