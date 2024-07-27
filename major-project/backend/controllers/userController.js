const UserModel = require("../controllers/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { email, password, name } = req.body;
  const emailExists = await UserModel.findOne({ email: email });
  if (emailExists) {
    return res.status(400).send("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    name: name,
    email: email,
    password: hashPassword,
  });
  const savedUser = newUser.save();

  // creat payload then Generate an access token .
  const token = jwt.sign({ userId: savedUser._id }, "randomsecret");
  return res.status(200).json({
    user: newUser,
    token: token,
  });

  // console.log(req.body);
  // res.join("post success");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = UserModel.findOne({ email: email });

  if (!user) {
    return res.status(400).send("User Not Found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const token = jwt.sign({ userId: user._id }, "randomsecret");
    return res.status(200).json({
      user: user,
      token: token,
    });
  }
  return res.status(401).send("Invalid Password");
  // console.log(req.body);
  // res.join("post success");
};

module.exports = { userRegister, userLogin };
