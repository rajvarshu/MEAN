const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
    const {authorization} = req.headers;
    if (typeof authorization !== 'undefined') {
        const jwtToken = authorization.split('Bearer ')[1].trim();
        jwt.verify(jwtToken, 'wenable',(err, result) => {
            console.log('In jwt verify >> ', err, result);
            if(err) {
                res.status(403).json({message: err.message})
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({message: 'Token required'});
    }
}
module.exports = verifyAuthToken;