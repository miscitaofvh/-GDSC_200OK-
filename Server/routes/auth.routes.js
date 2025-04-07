const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const { checklogin } = require('../controllers/auth.controller');

// Validate & Register
router.post('/register', [
    check('Username').notEmpty().withMessage('Username is required'),
    check('Email').isEmail().withMessage('Invalid email'),
    check('Password').notEmpty().withMessage('Password is required'),
    check('Name').notEmpty().withMessage('Name is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    register(req, res);
});

router.post('/login', login);
router.post('/logout', logout);
router.get('/checklogin',checklogin);

module.exports = router;
