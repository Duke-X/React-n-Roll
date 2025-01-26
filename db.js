const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(process.env.MONGO_URL);

const userSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {type : String, unique : true},
    password : String
});

const adminSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {type : String, unique : true},
    password : String
});

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorID : ObjectId 
});

const purchaseSchema = new Schema({
    courseId : ObjectId,
    userId : ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}