require('dotenv').config();
const moment = require('moment');
const jwt = require('jsonwebtoken');

const usersDb = require('../usingDB/controllers/QuickCredit');

const {
  createALoanDB,
  getAllLoansDB,
  getALoanDB,
  approveOrRejectLoanDB,
} = usersDb;

const Loan = {
  createALoan: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return createALoanDB(req, res, authData);
    });
  },

  getAllLoans: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      if (authData.is_admin === true) {
        if (req.value.query.status) {
          return getLoansByStatus(req, res);
        }
        if (req.value.query.status && req.value.query.repaid) {
          if ((req.value.query.status === 'approved') && (req.value.query.repaid === false)) {
            return getCurrentLoans(req, res);
          }
          if ((req.value.query.status === 'approved') && (req.value.query.repaid === true)) {
            return getRepaidLoans(req, res);
          }
          if (req.value.query.email) {
            return getLoansByEmail(req, res);
          }
        }
        return getAllLoansDB(req, res);
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  getALoan: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return getALoanDB(req, res, authData);
    });
  },

  approveOrRejectLoan: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      return approveOrRejectLoanDB(req, res, authData);
    });
  },
};

module.exports = Loan;
