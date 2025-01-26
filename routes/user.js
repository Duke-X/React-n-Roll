const { Router } = require("express");
const userRouter = Router();
const { z } = require("zod");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER} = require('../config');
const { middlewareUser } = require("../middleware/user");

//no need to user /user here as it will be directly provided in server.js while calling this

userRouter.post("/signup", async (req, res) => {
  const responseBody = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().min(10).max(50).email(),
    password: z.string().min(5).max(50),
  });
  const { firstName, lastName, email, password } = req.body;
  const hashPass = await bcrypt.hash(password, 10);
  const { success, error } = responseBody.safeParse(req.body);
  if (!success) {
    res.json({
      message: "Incorrect Format",
    });
    return;
  }
  await userModel.create({
    firstName,
    lastName,
    email,
    password: hashPass,
  });
  res.json({
    message: "Successfully Signed Up",
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(403).json({
      message: "user doesn't exist in db",
    });
  }

  const matchPass = bcrypt.compare(password, user.hashPass);

  if (matchPass) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_USER
    );

    res.json({
      message: "Successfully Signed In, Here's your token : " + token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

userRouter.get("/all-courses", middlewareUser, (req, res) => {
  res.json({
    message: "All Course Endpoint",
  });
});

module.exports = {
  userRouter,
};
