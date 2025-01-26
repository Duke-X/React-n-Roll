const jwt = require('jsonwebtoken');
const { JWT_ADMIN } = require('../config');

function middlewareAdmin(req, res, next){
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_ADMIN);

    if(decode){
        req.userId = decode.id;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    middlewareAdmin
}