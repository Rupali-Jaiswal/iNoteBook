const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Mysecrete';
const User=require('../models/User')
const fetchuser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            console.log("Invalid token: Token missing");
            return res.status(401).json({ error: 'Unauthorized: Token missing' });
        }

        const token = authHeader && authHeader.split(' ')

        const decoded = jwt.verify(token.toString(), JWT_SECRET); 
        console.log("Decoded token:", decoded);

        // Set the user information in req.user
        const userData = await User.findById(decoded.userId).select({password:0});
        if (!userData) {
            console.log("User not found");
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = userData;
        next();
    } catch (error) {
        console.log("Invalid token: " + error.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = fetchuser;
