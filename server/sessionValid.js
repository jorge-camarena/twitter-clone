const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/validateSession', verify, (req, res) => {
    res.send({
        auth: true,
        message: 'Logged In, continue on home page'
    })
})

module.exports = router