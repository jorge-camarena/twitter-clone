const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const envSecret = process.env.SECRET;
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({
        auth: false,
        message: 'Access Denied'
    });

    try {
        const verified = jwt.verify(token, envSecret);
        console.log(verified)
        req.user = verified;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).send({
            auth: false,
            message: 'Invalid Token'
        });
        
    }
}