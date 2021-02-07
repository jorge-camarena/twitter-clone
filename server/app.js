const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./posts');
const authRoute = require('./auth');
const validSession = require('./sessionValid')
const verify = require('./verifyToken');
const Post = require('../models/twitter_posts')
require('dotenv').config();


//MIDDLEWARE
app.use(express.static('client'));
app.use(express.json());
app.use(bodyParser.json());

//TWITTERCLONE API ROUTES
app.use('/api', postRoute);
app.use('/api', authRoute);
app.use('/api', validSession);

//RECEIVE-TWEET FROM DATABASE API
app.get('/api/get-tweets', verify, async (req, res) => {
    try {
        const allPosts = await Post.find();
        console.log(allPosts);
        console.log(req.user);
        res.json(allPosts);
    } catch(err) {
        console.log(err)
        res.json({ message: err });
    }
});

app.get('/signout', (req, res) => {
    res.redirect('http://localhost:5000/login.html')
})

//Connect to DB
const uri = process.env.DB_CONNECTION;
mongoose.connect(
    uri,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    
    () => console.log('Connected to DB')
);   

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const PORT = 5000;

app.listen(PORT, () => {
    console.log('Now listening on PORT: 5000');
});