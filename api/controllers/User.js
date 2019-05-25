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
  completeProfileDB,
  verifyClientDB,
  unVerifyClientDB,
  updateProfileDB,
} = usersDb;
const { users } = UserModel;

const User = {
  signup: (req, res) => {
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
      return completeProfileDB(req, res, authData);
    });
  },

  verifyUser: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return verifyClientDB(req, res, authData);
    });
  },

  unVerifyUser: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return unVerifyClientDB(req, res, authData);
    });
  },

  updateProfile: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return updateProfileDB(req, res, authData);
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
