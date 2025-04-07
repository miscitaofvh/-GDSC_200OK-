const { getDB } = require('../utils/db');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

// exports.getUser = async (req, res) => {
//     const { UserID } = req.query;
//     if (!UserID || !ObjectId.isValid(UserID)) return res.status(400).json({ error: "Invalid UserID" });

//     const user = await getDB().collection('user').findOne({ _id: new ObjectId(UserID) }, { projection: { Password: 0 } });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     return res.status(200).json(user);
// };

exports.updateUser = async (req, res) => {
    const userId = req.session.user_id;

    if (!userId || !ObjectId.isValid(userId)) {
        return res.status(401).json({ error: "Unauthorized or invalid session" });
    }

    const { Username, Email, Name, Password, currentPassword } = req.body;
    const updates = {};

    // check currentPassword
    const requireAuthFields = [Username, Email, Password, Name].some(field => field);
    if (requireAuthFields && !currentPassword) {
        return res.status(400).json({ error: "Current password is required to update sensitive info" });
    }

    // Nếu cần, thì kiểm tra mật khẩu hiện tại
    if (requireAuthFields) {
        const user = await getDB().collection('user').findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.Password);
        if (!isPasswordMatch) {
            return res.status(403).json({ error: "Current password is incorrect" });
        }
    }

    // kiểm tra thông tin đầu vào
    if (Username) {
        const usernameRegex = /^[A-Za-z0-9_]+$/;
        if (!usernameRegex.test(Username)) {
            return res.status(400).json({ error: "Username must not contain special characters" });
        }
        updates.Username = Username;
    }

    if (Email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }
        updates.Email = Email;
    }

    if (Name) {
        updates.Name = Name;
    }

    if (Password) {
        if (Password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        updates.Password = await bcrypt.hash(Password, 10);
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No valid fields to update" });
    }

    const result = await getDB().collection('user').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updates }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User updated successfully." });
};


exports.userinfo = async (req, res) => {
    const userId = req.session.user_id;

    if (!userId || !ObjectId.isValid(userId)) {
        return res.status(401).json({ error: "Not logged in" });
    }

    const user = await getDB().collection('user').findOne(
        { _id: new ObjectId(userId) },
        { projection: { Password: 0, _id:0 } }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
};


exports.deleteUser = async (req, res) => {
    const { UserID } = req.body;
    if (!UserID || !ObjectId.isValid(UserID)) return res.status(400).json({ error: "Invalid UserID" });

    const result = await getDB().collection('user').deleteOne({ _id: new ObjectId(UserID) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted successfully." });
};


