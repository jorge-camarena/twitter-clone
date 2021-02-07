const router = require('express').Router();
const Post = require('../models/twitter_posts');
const verify = require('./verifyToken');

//POST-TWEET API
router.post('/post-tweet', verify, async (req, res) => {
    const post = new Post({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        content: req.body.content,
        likes: req.body.likes
    });
    console.log(req.user)

    try {
        const newPost = await post.save();
        res.json(post);

    } catch(error) {
        res.send(error);
        console.log(error)
    }
    console.log(req.body);
    console.log(req.user);
});

module.exports = router; 
