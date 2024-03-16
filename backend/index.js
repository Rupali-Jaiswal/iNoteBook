const connectToMongo = require('./db');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const User = require('./models/User'); // Make sure to import your User model
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose=require('mongoose')
const port = 5000;
const app = express();
connectToMongo();
// Use cookie-parser middleware to handle cookies
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend origin
    credentials: true,
}));

app.use(express.json());

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/iNotebook',
    collection: 'sessions'
  });
store.on('error', function (error) {
    console.error('MongoDB session store error:', error);
  });

// Generate a random secret key
const crypto = require('crypto');
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};
const secretKey = generateSecretKey();
console.log('Generated secret key:', secretKey);


// Set up express-session middleware
app.use(session({
    secret: secretKey,  // Replace with a secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000*24,  // Cookie expiration time in milliseconds (1 hour in this example)
        httpOnly: true,
    },
     store: store,
}));

const fetchuser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ 'Error': 'Access denied!' });
    }

    // Set the user information in req.user
    try {
        const userData = await User.findById(req.session.userId);
        req.user = userData;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Some internal server error');
    }
};

app.get('/api/auth/getUser', cors({
    origin: 'http://localhost:3000', // Update with your frontend origin
    credentials: true,
}), fetchuser, async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).send('Some internal server error');
    }
});

app.use('/api/auth', require('./routers/auth'));
app.use('/api/note', require('./routers/note'));

// Protected route using the fetchuser middleware
app.get('/protected', fetchuser, (req, res) => {
    res.json({ user: req.user });
});

app.listen(port, () => {
    console.log(`app listening on port  http://localhost:${port}/`);
});
