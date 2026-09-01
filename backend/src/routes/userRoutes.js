const express = require('express');
const router = express.Router();
const { extractUserId } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUsersByTeamLead,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', extractUserId, getAllUsers);
router.get('/user/:id', extractUserId, getUserById);
router.get('/teamUsers/:teamLeadId', extractUserId, getUsersByTeamLead);
router.post('/user', extractUserId, createUser);
router.put('/user', extractUserId, updateUser);
router.delete('/user/:id', extractUserId, deleteUser);

module.exports = router;