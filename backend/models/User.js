const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Mysecrete';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({ userId: this._id.toString() }, JWT_SECRET , { expiresIn: "30d" });
    } catch (error) {
        console.error("token error:" + error);
    }
};

const User = mongoose.model('user', userSchema);
User.createIndexes();
module.exports = User;
