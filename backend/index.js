const connectToMongo = require('./db');
const express = require('express');
const fetchuser=require("./middleware/fetchuser")
const cors = require('cors');
const app = express();
const errorHandling=require('./middleware/errorHandling')
connectToMongo();


app.use(cors({
    origin: ['http://localhost:3000','https://i-note-book-wheat.vercel.app','https://i-note-book-pi.vercel.app', 'https://i-notebook-6e9cja2bc-rupali-s-projects.vercel.app/',"https://i-notebook-lilac.vercel.app/",'https://i-note-book-pink.vercel.app/'],
     // Update with your frontend origin'
    credentials: true,
}));

app.use(express.json());


app.use('/api/auth', require('./routers/auth'));
app.use('/api/note', require('./routers/note'));

// Protected route using the fetchuser middleware
app.get('/protected', fetchuser, (req, res) => {
    res.json({ user: req.user });
});
app.get('/', (req, res) => {
    res.json({'Hello':'this is inotebook'});
});



app.use(errorHandling)
const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port  http://localhost:${port}/`);
});
