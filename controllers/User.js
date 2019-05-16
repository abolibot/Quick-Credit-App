const moment = require('moment');
//const { check, validationResult } = require('express-validator/check');
const UserModel = require('../models/User');


const { users } = UserModel;

const User = {
  signup: (req, res) => {
    // ('name').not().isEmpty().withMessage('Name must have more than 5 characters');
    const doesEmailExist = users.find(u => u.emailAddress === req.body.emailAddress);
    if (doesEmailExist) return res.status(409).send('email address already exists, kindly enter a different email address');
    const user = UserModel.createUser(req.body);
    return res.status(201).send(user);
  },

  signin: (req, res) => {
    const user = users.find(u => u.emailAddress === req.body.emailAddress);
    if ((!user) || (user.password !== req.body.password)) return res.status(401).send('please check your login details and try again');
    return res.status(200).send(user);
  },

  getAllUsers: (req, res) => {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
      const pendingVerificationUsers = users.filter(u => u.status === query.status);
      if (pendingVerificationUsers.length === 0) return res.status(404).send(`no clients with ${query.status} status`);
      return res.status(200).send(pendingVerificationUsers);
    }
    return res.status(200).send(users);
  },

  getAUser: (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id, 10));
    if (!user) return res.status(404).send('user with given id not found');
    return res.send(user);
  },

  verifyUser: (req, res) => {
    const user = users.find(u => u.emailAddress === req.params.emailAddress);
    if (!user) return res.status(404).send('user with email doesn\'t exist');
    if (!user.completedProfileAt) return res.status(403).send('user cannot be verified, complete profile first');
    if (user.status === 'verified') return res.status(403).send('user is already marked as verified');
    user.status = 'verified';
    user.verifiedAt = moment().format('MMMM Do YYYY, h:mm a');
    return res.status(200).send(user);
  },

  unVerifyUser: (req, res) => {
    const user = users.find(u => u.emailAddress === req.params.emailAddress);
    if (!user) return res.status(404).send('user with email doesn\'t exist');
    if (!user.completedProfileAt) return res.status(403).send('user cannot be unverified, complete profile first');
    if (user.status === 'unverified') return res.status(403).send('user is already marked as unverified');
    user.status = 'unverified';
    user.unverifiedAt = moment().format('MMMM Do YYYY, h:mm a');
    return res.status(200).send(user);
  },

  completeProfile: (req, res) => {
    const user = users.find(u => u.emailAddress === req.params.emailAddress);
    if (!user) return res.status(404).send('user with email doesn\'t exist');
    if (user.completedProfileAt) return res.status(403).send('user already completed profile, use the update feature to update profile');

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
    user.completedProfileAt = moment().format('Do MMMM YYYY, h:mm a');

    return res.status(200).send(user);
  },

  updateProfile: (req, res) => {
    const user = users.find(u => u.emailAddress === req.params.emailAddress);
    if (!user) return res.status(404).send('user with email doesn\'t exist');

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
    user.modifiedAt = moment().format('Do MMMM YYYY, h:mm a');
    return res.status(200).send(user);
  },
};

module.exports = User;
