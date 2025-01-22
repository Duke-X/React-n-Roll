//ALWAYS BUILD THE BACKEND FIRST THEN FRONTEND

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;

app.post('/user/signup', (req,res) => {
    res.json({
        message : "Signup Endpoint"
    })
});

app.post('/user/login', (req, res) => {
    res.json({
        message : "Login Endpoint"
    })
});

app.post('/course/purchase', (req, res) => {
    res.json({
        message : "Buying Endpoint"
    })
});

app.get('/user/all-courses', (req, res) => {
    res.json({
        message : "All Course Endpoint"
    })
});

app.get('/user/my-courses', (req, res) => {
    res.json({
        message : "My Course Endpoint"
    })
});

app.listen(PORT, {
    message : console.log(`Server Running on port ${PORT}`)
})