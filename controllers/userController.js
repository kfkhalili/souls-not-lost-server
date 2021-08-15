const User = require("../models/User");
const Person = require("../models/Person");
const {userModel} = require("./cModels/UserModel");

//getUserById function to retrieve user by id
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  //if user id match param id send user else throw error
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
    res.status(404);
    throw new Error("User not found");
  }
};

const user = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id})
      .select(userModel);

  res.status(200).json(user);
};

const users = async (req, res) => {
  const page = req.query.pageNumber || 0;
  const pageSize = req.query.pageSize || 0;
  const userType = req.query.userType || "client";
  const users = await User.find({userType})
      .select(userModel)
      .sort({createdAt: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  const total = await User.find({userType:"client"}).countDocuments();

  res.status(200).json({
    entities: users,
    page: page,
    pageSize: pageSize,
    totalCount: total,
  });
};

const admins = async (req, res) => {
  const page = req.query.page || 0;
  const pageSize = req.query.pageSize || 0;
  const users = await User.find({userType:"admin"})
      .select(userModel)
      .sort({createdAt: -1})
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  const total = await User.find().countDocuments();

  res.status(200).json({
    data: users,
    page: page,
    pageSize: pageSize,
    total: total,
  });
};

const canUpload = async (req, res)=>{
  const user = await User
      .findOne({ _id:req.query.id })
      .select(userModel);
  user.canUpload = req.query.canUpload === "1";
  await user.save();

  res.status(200).json({
    data: user,
    message : "user updated"
  });
}

const changeRole = async (req, res)=>{
  const user = await User
      .findOne({_id: req.query._id});
  user.userType = req.query.userType;
  await user.save();

  res.status(200).json({
    data: user,
    message : "user updated"
  });
}

const suspendUser = async (req, res)=>{
  const user = await User.findOne({_id:req.query._id}).select(userModel);
  user.isSuspended = req.query.isSuspended === "1";
  await user.save();

  res.status(200).json({
    data: user,
    message : user.isSuspended ? "user has been suspended":"user has been activated"
  });
}

const userProfile = async (req, res)=>{
  const user = await User.findOne({ _id:req.query._id}).select(userModel);
  const people = await Person.find({ createdBy:req.query._id }).select(userModel);
  res.status(200).json({
    data: {
      user,
      people
    },
    message :  "user data loaded"
  });
}

module.exports = {
  user,
  users,
  admins,
  userProfile,
  suspendUser,
  changeRole,
  canUpload
};
