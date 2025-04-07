const { getDB } = require('../utils/db');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


exports.register = async (req, res) => {
    const { username, email, password, name } = req.body;
    const db = require('../utils/db').getDB();
    const userCollection = db.collection('user');
    const bcrypt = require('bcrypt');

    try {
        const existingUser = await userCollection.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username or Email already exists." });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Thêm user vào database
        await userCollection.insertOne({
            username,
            email,
            password: hashedPassword,
            name,
            role: 'user',
            createDate: new Date()
        });

        return res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};



exports.login = async (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) return res.status(400).json({ error: "Missing login info" });

    const userCollection = getDB().collection('user');
    const user = await userCollection.findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user_id = user._id.toString();
        req.session.username = user.username;

        return res.status(200).json({
            message: "Login successful!",
            username: user.username,
            user_id: user._id.toString(),
            email: user.email,
        });
    }

    return res.status(401).json({ error: "Invalid credentials" });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Logged out successfully." });
    });
};

exports.checklogin = (req, res) => {
    if (req.session && req.session.user_id) {
        return res.status(200).json({
            message: "User is logged in",
            // user_id: req.session.user_id,
            username: req.session.username
        });
    } else {
        return res.status(401).json({ error: "Not logged in" });
    }
};
