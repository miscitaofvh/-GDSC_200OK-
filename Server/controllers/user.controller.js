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
    const { UserID, Username, Email, Name, Password } = req.body;
    if (!UserID || !ObjectId.isValid(UserID)) return res.status(400).json({ error: "Invalid UserID" });

    const updates = {};
    if (Username) updates.Username = Username;
    if (Email) updates.Email = Email;
    if (Name) updates.Name = Name;
    if (Password) updates.Password = await bcrypt.hash(Password, 10);

    const result = await getDB().collection('user').updateOne(
        { _id: new ObjectId(UserID) },
        { $set: updates }
    );

    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    return res.status(200).json({ message: "User updated successfully." });
};

exports.deleteUser = async (req, res) => {
    const { UserID } = req.body;
    if (!UserID || !ObjectId.isValid(UserID)) return res.status(400).json({ error: "Invalid UserID" });

    const result = await getDB().collection('user').deleteOne({ _id: new ObjectId(UserID) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ message: "User deleted successfully." });
};
