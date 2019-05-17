const UserModel = require('../models/User');

const date = new Date();
const { users } = UserModel;

const User = {
  signup: (req, res) => {
    const doesEmailExist = users.find(u => u.email === req.body.email);
    if (doesEmailExist) return res.status(409).json({ status: 409, error: 'email address already exists, kindly enter a different email address' });
    const user = UserModel.createUser(req.body);
    return res.status(201).json({ status: 201, data: user });
  },

  signin: (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if ((!user) || (user.password !== req.body.password)) return res.status(401).json({ status: 401, error: 'invalid login details' });
    return res.status(200).json({ status: 200, data: user });
  },
};

module.exports = User;
