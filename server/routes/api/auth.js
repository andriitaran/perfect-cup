const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const { registerValidation, loginValidation } = require("../../validation");

const createUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const { name, email } = body;
  const password = await bcrypt.hash(body.password, salt);
  return User({ name, email, password });
}

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).send("Email already exists");
  }
  const user = await createUser(req.body);
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exists");
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
     res.status(400).send("Invalid password");
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send({
    user : user.name,
    token : token
  })
});

module.exports = router;
