const connectToMongo=require('./db')
const express = require('express')
const port = 5000
const app = express()
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fetchuser=require('./middleware/fetchuser')
const cors=require('cors')
// Use cookie-parser middleware to handle cookies
app.use(cookieParser());

app.use(cors())

app.use(express.json())
// Set up express-session middleware
app.use(session({
    secret: 'your-secret-key',  // Replace with a secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,  // Cookie expiration time in milliseconds (1 hour in this example)
        httpOnly: true,
    },
}));

connectToMongo()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api/auth', require('./routers/auth'))
app.use('/api/note', require('./routers/note'))

// Protected route using the fetchuser middleware
app.get('/protected', fetchuser, (req, res) => {
  res.json({ user: req.user });
});

app.listen(port, () => {
  console.log(`app listening on port  http://localhost:${port}/`)
})
