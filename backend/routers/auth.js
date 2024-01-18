const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const session = require('express-session');
const fetchuser = require('../middleware/fetchuser')

// In app.js
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,  // 1 hour in milliseconds
        httpOnly: true,
    },
}));


// create a user sign-up at api/auth/ end point
router.post('/createUser', [
    body('name', 'Enter a vaild name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be minimun of 5 charector').isLength({ min: 5 }),
    body('password', 'Password must contain atleast one charector').matches(/[-_@%^&$#*]/),
    body('password', 'Password must contain atleast one integer').matches(/[0-9]/)
], async (req, res) => {
    let Error = validationResult(req)
    if (!Error.isEmpty()) {
        return res.status(400).json({ 'Error': Error.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ "Error": 'Sorry! a user with this email already exits' })
        }
        const salt = await bcrypt.genSalt(10)
        const securepass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: securepass,
            email: req.body.email
        })
        user.save()
        req.session.userId = user.id
        res.json({ 'Nice': 'your account has been created', user })
    } catch (error) {
        console.log(error.message)
        res.send('some error occured')
    }

})

// Create a user login at api/auth/ end point
router.post('/login', [body('email', 'Please enter a valid email').isEmail()], async (req, res) => {
    let error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ 'error': error.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ "sorry": 'Please login with correct credential' })
        }
        const checkpass = await bcrypt.compare(password, user.password)
        if (!checkpass) {
            return res.status(400).json({ "sorry": 'Please login with correct credential' })
        }
        req.session.userId = user.id
        console.log(req.session.userId)
        res.json({ 'Nice': 'you have logged in' })
    }
    catch {
        console.log(error.message)
        res.status(400).send('Some internal server error')
    }
})

// Authenticate user
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(400).send('Some internal server error')
    }
})

module.exports = router