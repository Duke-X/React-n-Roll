const {Router} = require('express');
const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.json({
        message : "signup endpoint"
    })
});

adminRouter.post('/login', (req, res) => {
    res.json({
        message : "login endpoint"
    })
});

adminRouter.post('/course', (req, res) => {
    res.json({
        message : "create course endpoint"
    })
});

adminRouter.put('/course', (req, res) => {
    res.json({
        message : "update course endpoint"
    })
});

adminRouter.get('/course/bulk', (req, res) => {
    res.json({
        message : "fetch courses"
    })
});

module.exports = {
    adminRouter
}
