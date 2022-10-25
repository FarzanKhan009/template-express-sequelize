const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    email: req.body.email,
    hashedPassword: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.login = async (req, res) => {
  console.log('req.body.email', req.body);

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(404).send("Not found!");

  const validatePassword = await bcrypt.compare(req.body.password, user.hashedPassword);
  if (!validatePassword) return res.status(400).send("Wrong password!");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).json({ token });

};