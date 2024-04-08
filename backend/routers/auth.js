const express = require('express')
const router = express.Router()
const fetchuser=require("../middleware/fetchuser")

//? In Express.js, express.Router() is a mini Express application without all the server configurations but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.
//* <https://expressjs.com/en/guide/routing.html>
//? Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

const User = require('../models/User')
const bcrypt = require('bcryptjs')
const validate=require('../middleware/auth-validation')
const signupSchema=require('../middleware/signup-validation')
const loginSchema=require('../middleware/login-validation')


// create a user sign-up at api/auth/ end point
router.post('/createUser', validate(signupSchema),
    async (req, res) => {
    try {
        let userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            return res.status(400).json({ "Error": 'Sorry! a User with this email already exits' })
        }
        const salt = await bcrypt.genSalt(10)
        const securepass = await bcrypt.hash(req.body.password, salt)
        userCreated = await User.create({
            name: req.body.name,
            password: securepass,
            email: req.body.email
        })
        await userCreated.save()
        res.status(201).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
            name:userCreated.name.toString()
          });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('some error occured')
    }

})


// Create a user login at api/auth/ end point
router.route('/login').post(validate(loginSchema), async (req,   res) => {
    const { email, password } = req.body
    try {
        let userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ "sorry": 'Please login with correct credential' })
        }
        const checkpass = await bcrypt.compare(password, userExist.password)
        if (!checkpass) {
            return res.status(400).json({ "sorry": 'Please login with correct credential' })
        }
        console.log("backend: you have logged in")
        res.status(200).json({
            message: "Login Successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
            name:userExist.name
          });
    }
    catch {
        console.log(errors.message)
        res.status(500).send('Some internal server error')
    }
})


router.get('/getUser',  fetchuser, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).send('Some internal server error');
    }
});
module.exports = router
