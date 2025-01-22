//ALWAYS BUILD THE BACKEND FIRST THEN FRONTEND

const express = require('express');
const jwt = require('jsonwebtoken');

const {userRouter} = require('./user');
const {courseRouter} = require('./course');
const {adminRouter} = require('./admin');

const app = express();
const PORT = 3000;

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);


app.listen(PORT, {
    message : console.log(`Server Running on port ${PORT}`)
})