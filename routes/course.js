const {Router} = require('express');
const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
    res.json({
        message : "Buying Endpoint"
    })
});

courseRouter.get('/my-courses', (req, res) => {
    res.json({
        message : "My Course Endpoint"
    })
});

module.exports = {
    courseRouter
}