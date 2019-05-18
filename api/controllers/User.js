const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');

const date = new Date();
const { users } = UserModel;
const { passwords } = UserModel;

const User = {
  signup: (req, res) => {
    const doesEmailExist = users.find(u => u.email === req.body.email);
    if (doesEmailExist) return res.status(409).json({ status: 409, error: 'email address already exists, kindly enter a different email address' });
    const user = UserModel.createUser(req.body);
    return res.status(201).json({ status: 201, data: user });
  },

  signin: (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (!user) return res.status(401).json({ status: 401, error: 'invalid login details' });
    return bcrypt.compare(req.body.password, passwords.find(password => password.userId === user.id).hashedPassword, (err, isMatch) => {
      if (isMatch) {
        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(401).json({ status: 401, error: 'invalid login details' });
    });
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

  completeProfile: (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
    if (user.completedProfileAt) return res.status(403).json({ status: 403, error: 'user already completed profile, use the update feature to update profile' });

    user.sex = req.body.sex;
    user.dob = req.body.dob;
    user.validIdUrl = req.body.validIdUrl;
    user.displayPictureUrl = req.body.displayPictureUrl;
    user.phoneNumber = req.body.phoneNumber;
    user.homeAddress = req.body.homeAddress;
    user.homeCity = req.body.homeCity;
    user.homeState = req.body.homeState;
    user.employmentStatus = req.body.employmentStatus;
    user.employerName = req.body.employerName || null;
    user.workAddress = req.body.workAddress || null;
    user.workCity = req.body.workCity || null;
    user.workState = req.body.workState || null;
    user.bvn = req.body.bvn;
    user.bank = req.body.bank;
    user.accountNumber = req.body.accountNumber;
    user.completedProfileAt = date.toUTCString();

    return res.status(200).json({ status: 200, data: user });
  },

  verifyUser: (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
    if (!user.completedProfileAt) return res.status(403).json({ status: 403, error: 'user cannot be verified, complete profile first' });
    if (user.status === 'verified') return res.status(403).json({ status: 403, error: 'user is already marked as verified' });
    user.status = 'verified';
    user.verifiedAt = date.toUTCString();
    return res.status(200).json({ status: 200, data: user });
  },

  unVerifyUser: (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
    if (!user.completedProfileAt) return res.status(403).json({ status: 403, error: 'user cannot be unverified, complete profile first' });
    if (user.status === 'unverified') return res.status(403).json({ status: 403, error: 'user is already marked as unverified' });
    user.status = 'unverified';
    user.unverifiedAt = date.toUTCString();
    return res.status(200).json({ status: 200, data: user });
  },

  updateProfile: (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });

    user.sex = req.body.sex || user.sex;
    user.dob = req.body.dob || user.dob;
    user.validIdUrl = req.body.validIdUrl || user.validIdUrl;
    user.displayPictureUrl = req.body.displayPictureUrl || user.displayPictureUrl;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.homeAddress = req.body.homeAddress || user.homeAddress;
    user.homeCity = req.body.homeCity || user.homeCity;
    user.homeState = req.body.homeState || user.homeState;
    user.employmentStatus = req.body.employmentStatus || user.employmentStatus;
    user.employerName = req.body.employerName || user.employerName;
    user.workAddress = req.body.workAddress || user.workAddress;
    user.workCity = req.body.workCity || user.workCity;
    user.workState = req.body.workState || user.workState;
    user.bvn = req.body.bvn || user.bvn;
    user.bank = req.body.bank || user.bank;
    user.accountNumber = req.body.accountNumber || user.accountNumber;
    user.modifiedAt = date.toUTCString();
    return res.status(200).json({ status: 200, data: user });
  },
};

module.exports = User;
