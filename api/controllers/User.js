require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const usersDb = require('../usingDB/controllers/QuickCredit');

const {
  createUser,
  signIn,
  getClientsByStatus,
  getAll,
  getAClientByEmail,
  } = usersDb;
const { users } = UserModel;

const User = {
  signup: (req, res) => {
    const doesEmailExist = users.find(u => u.email === req.value.body.email);
    if (doesEmailExist) return res.status(409).json({ status: 409, error: 'email address already exists, kindly enter a different email address' });
    return jwt.sign({ email: req.value.body.email, is_admin: false }, process.env.JWT_SECRET_KEY, { expiresIn: '86400s' }, (err, tkn) => {
      const userToken = tkn;
      bcrypt.hash(req.value.body.password, 10, (err, hash) => {
        const hashedPassword = hash;
        return createUser(req, res, hashedPassword, userToken);
      });
    });
  },

  signin: (req, res) => signIn(req, res),

  getAllUsers: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      if (authData.is_admin === true) {
        if (req.value.query.status) {
          return getClientsByStatus(req, res);
        }
        return getAll(req, res);
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  getAUser: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return getAClientByEmail(req, res, authData);
    });
  },

  completeProfile: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const user = users.find(u => u.email === req.value.params.email);
      if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
      if ((authData.isAdmin === false) && (authData.email === req.value.params.email)) {
        if (user.completedProfileAt) return res.status(401).json({ status: 401, error: 'user already completed profile, use the update feature to update profile' });

        user.sex = req.value.body.sex;
        user.dob = req.value.body.dob;
        user.validIdUrl = req.value.body.validIdUrl;
        user.displayPictureUrl = req.value.body.displayPictureUrl;
        user.phoneNumber = req.value.body.phoneNumber;
        user.homeAddress = req.value.body.homeAddress;
        user.homeCity = req.value.body.homeCity;
        user.homeState = req.value.body.homeState;
        user.employmentStatus = req.value.body.employmentStatus;
        user.employerName = req.value.body.employerName || null;
        user.workAddress = req.value.body.workAddress || null;
        user.workCity = req.value.body.workCity || null;
        user.workState = req.value.body.workState || null;
        user.bvn = req.value.body.bvn;
        user.bank = req.value.body.bank;
        user.accountNumber = req.value.body.accountNumber;
        user.completedProfileAt = new Date().toLocaleString();

        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  verifyUser: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const user = users.find(u => u.email === req.value.params.email);
      if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
      if (authData.isAdmin === true) {
        if (!user.completedProfileAt) return res.status(403).json({ status: 403, error: 'user cannot be verified, complete profile first' });
        if (user.status === 'verified') return res.status(403).json({ status: 403, error: 'user is already marked as verified' });
        if (user.status === 'unverified') return res.status(403).json({ status: 403, error: 'user is already marked as unverified' });
        user.status = 'verified';
        user.verifiedAt = new Date().toLocaleString();
        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  unVerifyUser: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const user = users.find(u => u.email === req.value.params.email);
      if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
      if (authData.isAdmin === true) {
        if (!user.completedProfileAt) return res.status(403).json({ status: 403, error: 'user cannot be unverified, complete profile first' });
        if (user.status === 'unverified') return res.status(403).json({ status: 403, error: 'user is already marked as unverified' });
        if (user.status === 'verified') return res.status(403).json({ status: 403, error: 'user is already marked as verified' });
        user.status = 'unverified';
        user.unverifiedAt = new Date().toLocaleString();
        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  updateProfile: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const user = users.find(u => u.email === req.value.params.email);
      if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
      if ((authData.isAdmin === false) && (authData.email === req.value.params.email)) { 
        user.sex = req.value.body.sex || user.sex;
        user.dob = req.value.body.dob || user.dob;
        user.validIdUrl = req.value.body.validIdUrl || user.validIdUrl;
        user.displayPictureUrl = req.value.body.displayPictureUrl || user.displayPictureUrl;
        user.phoneNumber = req.value.body.phoneNumber || user.phoneNumber;
        user.homeAddress = req.value.body.homeAddress || user.homeAddress;
        user.homeCity = req.value.body.homeCity || user.homeCity;
        user.homeState = req.value.body.homeState || user.homeState;
        user.employmentStatus = req.value.body.employmentStatus || user.employmentStatus;
        user.employerName = req.value.body.employerName || user.employerName;
        user.workAddress = req.value.body.workAddress || user.workAddress;
        user.workCity = req.value.body.workCity || user.workCity;
        user.workState = req.value.body.workState || user.workState;
        user.bvn = req.value.body.bvn || user.bvn;
        user.bank = req.value.body.bank || user.bank;
        user.accountNumber = req.value.body.accountNumber || user.accountNumber;
        user.modifiedAt = new Date().toLocaleString();
        return res.status(200).json({ status: 200, data: user });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },
  // Format of token
  // Authorization: Bearer <access_token>

  verifyToken: (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    }
    return res.status(401).json({ status: 401, error: 'You need a token to access this route' });
  },
};

module.exports = User;
