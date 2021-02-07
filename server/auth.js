const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation')
const User = require('../models/users');

//CREATE USER API
router.post('/createUser', async (req, res) => {

    //Validate registration inputs
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if username already exists
    const alreadyExists = await User.findOne({UserName: req.body.UserName});
    if (alreadyExists) return res.status(400).send('Username already exists');

    //Generate salt, and safely store password in database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.Password, salt);


    const newUser = new User({
        FullName: req.body.FullName,
        UserName: req.body.UserName,
        Password: hashPassword
    });
    try {
        const saveUser = await newUser.save();
        res.send({
            success: true,
            newUser
        });
    } catch(err) {
        res.send({
            err
        });
        console.log(err);
    }
    console.log(req.body);
});

//LOGIN VALIDATION AND SESSION API
router.post('/login', async (req, res) => {
    //Validate login inputs
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checks if username exists
    const user = await User.findOne({UserName: req.body.UserName});
    if (!user) return res.status(400).send({
        login: false,
        message: 'Username does not exist'
    });

    //Check if Password is correct
    const validPass = await bcrypt.compare(req.body.Password, user.Password);
    if (!validPass) return res.status(400).send({
        login: false,
        message: 'Invalid Username or Password'
    });

    //Create and assign session token
    const envSecret = process.env.SECRET;
    const token = jwt.sign({ _id: user._id }, envSecret);

    res.header('auth-token', token).send({
        login: true,
        token: token,
        FullName: user.FullName,
        UserName: user.UserName
    });
});

module.exports = router;

// 'Stack', {
//     expiresIn: '1d'
// }, 