const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('../models/User')


// In fetchuser.js
const fetchuser = async (req, res, next) => {
    // Check if the user ID is present in the session
    if (!req.session.userId) {
        return res.status(401).json({ 'Error': 'Access denied!' });
    }

    // Set the user information in req.user
    try {
        const userData = await User.findById(req.session.userId);
        req.user = userData;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(400).send('Some internal server error');
    }
};

module.exports = fetchuser;
