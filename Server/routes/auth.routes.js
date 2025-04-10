const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { register, login, logout , authMe} = require('../controllers/auth.controller');
const { checklogin } = require('../controllers/auth.controller');
const { isAuthenticated } = require("../middleware/authMiddleware");

// Validate & Register
router.post('/register', [
    check('username')
        .notEmpty().withMessage('Username is required')
        .matches(/^[A-Za-z0-9_]+$/).withMessage('Username must not contain special characters'),
        
    check('email')
        .isEmail().withMessage('Invalid email'),
        
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    check('name')
        .notEmpty().withMessage('Name is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    register(req, res);
});


router.post('/login', login);
router.post('/logout', logout);
router.get('/checklogin',checklogin);
router.get("/me", isAuthenticated, authMe);

module.exports = router;
