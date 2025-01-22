const {Router} = require('express');
const userRouter = Router();

//no need to user /user here as it will be directly provided in server.js while calling this

userRouter.post('/signup', (req,res) => {
    res.json({
        message : "Signup Endpoint"
    })
});

userRouter.post('/login', (req, res) => {
    res.json({
        message : "Login Endpoint"
    })
});

userRouter.get('/all-courses', (req, res) => {
    res.json({
        message : "All Course Endpoint"
    })
});

module.exports = {
    userRouter
}
