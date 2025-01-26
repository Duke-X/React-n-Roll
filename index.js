//ALWAYS BUILD THE BACKEND FIRST THEN FRONTEND
// const mongoose = require('mongoose');
const express = require("express");
const jwt = require("jsonwebtoken");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
//to parse the JSON data to object so that body can give back the data
app.use(express.json());
const PORT = 3000;

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
  //this is good practice, as if database is not connected server won't start
  // await mongoose.connect("mongodb+srv://vadishchhatwal2321:takku2321@cluster0.iv4tf.mongodb.net/");
  app.listen(PORT, {
    message: console.log(`Server Running on port ${PORT}`),
  });
}

main();
