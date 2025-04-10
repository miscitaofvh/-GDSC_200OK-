function isAuthenticated(req, res, next) {
    if (req.session && req.session.user_id && req.session.username) {
        return next();
    } else {
        return res.status(401).json({ message: "Not authenticated" });
    }
}

module.exports = { isAuthenticated };