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

adminRouter.post('/create-course', (req, res) => {
    res.json({
        message : "create course endpoint"
    })
});

adminRouter.post('/del-course', (req, res) => {
    res.json({
        message : "delete course endpoint"
    })
});

adminRouter.post('/add-course-cont', (req, res) => {
    res.json({
        message : "add course endpoint"
    })
});

module.exports = {
    adminRouter
}
