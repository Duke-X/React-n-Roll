const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN } = require("../config");
const { middlewareAdmin } = require("../middleware/admin");

adminRouter.post("/signup", async (req, res) => {
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
  await adminModel.create({
    firstName,
    lastName,
    email,
    password: hashPass,
  });
  res.json({
    message: "Successfully Signed Up",
  });
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email,
  }); //we won't use password here, as it'll fetch us the hashed password and it won't match with the one user just entered to login

  if (!admin) {
    res.status(403).json({
      message: "user doesn't exist in db",
    });
  }

  const matchPass = await bcrypt.compare(password, admin.password);

  if (matchPass) {
    const token = jwt.sign(
      {
        id: admin._id.toString(),
      },
      JWT_ADMIN
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

adminRouter.post("/course", middlewareAdmin, async (req, res) => {
  const adminId = req.userId;

  const {title, description, price, imageUrl} = req.body;

  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorID : adminId
  });

  res.json({
    message : "Course Created",
    courseId : course._id
  })
});

adminRouter.put("/course", middlewareAdmin, async (req, res) => {
  const adminId = req.userId;

  const {title, description, price, imageUrl, courseId} = req.body;

  const course = await courseModel.updateOne({
    _id : courseId,
    creatorID : adminId
  },
    {
    title,
    description,
    price,
    imageUrl,
    creatorID : adminId
  });

  res.json({
    message : "Course Updated",
    courseId : course._id
  })
});

adminRouter.get("/course/bulk", middlewareAdmin, async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorID : adminId
  });

  res.json({
    message : "Course Retrieved",
    courses
  })
});

module.exports = {
  adminRouter,
};
