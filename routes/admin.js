const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel } = require("../db");
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

  const matchPass = bcrypt.compare(password, admin.hashPass);

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

adminRouter.post("/course", middlewareAdmin, (req, res) => {
  res.json({
    message: "create course endpoint",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "update course endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "fetch courses",
  });
});

module.exports = {
  adminRouter,
};
