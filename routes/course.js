const {Router} = require('express');
const { middlewareUser } = require('../middleware/user');
const { purchaseModel } = require('../db');
const courseRouter = Router();

courseRouter.post('/purchase', middlewareUser, async(req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message : "Course Bought Successfully"
    })
});

courseRouter.get('/preview', async(req, res) => {
    const courses = await courseModel.find({});        //empty array means, give me all the courses

    res.json({
        courses
    })
});

module.exports = {
    courseRouter
}