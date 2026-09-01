const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, cnic, teamLeadId } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(409).json({ message: 'Email already registered' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    cnic,
    teamLeadId,
  });

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, name: user.name, email: user.email },
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, teamLeadId: user.teamLeadId },
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json({ success: true, data: users });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ success: true, data: user });
});

exports.getUsersByTeamLead = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    where: { teamLeadId: req.params.teamLeadId },
    attributes: { exclude: ['password'] },
  });
  res.json({ success: true, data: users });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, cnic, teamLeadId } = req.body;
  const hashedPassword = await bcrypt.hash(password || 'Default123!', 10);
  const user = await User.create({ name, email, password: hashedPassword, cnic, teamLeadId });
  res.status(201).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id, name, email, teamLeadId } = req.body;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.update({ name, email, teamLeadId });
  res.json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.destroy();
  res.json({ success: true, message: 'User deleted' });
});