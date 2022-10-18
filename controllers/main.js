const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(200).json({ msg: "new user registered", newUser });
};

const login = async (req, res) => {
  const { email, password, name, city } = req.body;
  const findUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (findUser) {
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    return res.json({ msg: "user exists,login", token });
  }
  res.json({ msg: "login route" });
};

const getUsers = async (req, res) => {
  const { city, createdOn } = req.query;
  const queryObject = {};
  if (city) {
    queryObject.city = city;
  }
  if (createdOn) {
    queryObject.createdOn = createdOn;
  }

  const page = 3;
  const limit = 3;
  const skip = (page - 1) * limit;

  const allUsers = await User.find(queryObject)
    .sort("createdOn")
    .skip(skip)
    .limit(limit);

  //   const theUser = allUsers.remove({email:req.body.email})
  const ourUsers = allUsers.filter((obj) => {
    return obj.email !== req.body.email;
  });

  // list of all users except ourselves
  res.json({ ourUsers });
};

module.exports = {
  register,
  login,
  getUsers,
};
