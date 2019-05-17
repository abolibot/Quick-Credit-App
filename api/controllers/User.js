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

  getAllUsers: (req, res) => {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
      const pendingVerificationUsers = users.filter(u => u.status === query.status);
      if (pendingVerificationUsers.length === 0) return res.status(404).json({ status: 404, error: `no clients with ${query.status} status` });
      return res.status(200).json({ status: 200, data: pendingVerificationUsers });
    }
    return res.status(200).json({ status: 200, data: users });
  },

  getAUser: (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id, 10));
    if (!user) return res.status(404).json({ status: 404, error: 'user with given id not found' });
    return res.status(200).json({ status: 200, data: user });
  },
};

module.exports = User;
