const express = require('express');
const router = express.Router();
const { userinfo,getUser, updateUser, deleteUser } = require('../controllers/user.controller');

// router.get('/', getUser);
router.put('/', updateUser);
router.get('/', userinfo);
router.delete('/', deleteUser);

module.exports = router;
