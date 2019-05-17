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
};

module.exports = User;
