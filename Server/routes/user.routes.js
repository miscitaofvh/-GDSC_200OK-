const express = require('express');
const router = express.Router();
const { getUser, updateUser, deleteUser } = require('../controllers/user.controller');

// router.get('/', getUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
