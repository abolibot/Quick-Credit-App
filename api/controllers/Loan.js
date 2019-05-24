require('dotenv').config();
const moment = require('moment');
const jwt = require('jsonwebtoken');
const LoanModel = require('../models/Loan');
const UserModel = require('../models/User');
const loanRepaymentModel = require('../models/LoanRepayment');
const usersDb = require('../usingDB/controllers/QuickCredit');

const { loans } = LoanModel;
const { users } = UserModel;
const {
  createALoanDB,
  getAllLoansDB,
  getALoanDB,
} = usersDb;

const getAUserApprovedLoans = (userLoans) => {
  const userApprovedLoans = userLoans.filter(loan => loan.status === 'approved');
  return userApprovedLoans;
};

const getAUserPendingLoans = (userLoans) => {
  const userPendingLoans = userLoans.filter(loan => loan.status === 'pending');
  return userPendingLoans;
};

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
      const loan = loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10));
      if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id doesn\'t exist' });
      if (authData.isAdmin === true) {
        if (req.value.body.status === 'approved') {
          if (loan.status === 'approved') return res.status(403).json({ status: 403, error: 'loan is already approved' });
          if (loan.status === 'rejected') return res.status(403).json({ status: 403, error: 'loan is already rejected' });
          loan.status = 'approved';
          loan.approvedAt = new Date().toLocaleString();

          for (let i = 1; i <= loan.tenor; i += 1) {
            const loanRepayment = loanRepaymentModel.createLoanRepayment(loan);
            loanRepayment.dueDate = moment().add(i * 30, 'days').format('Do MMM YY');
          }
        }
        if (req.value.body.status === 'rejected') {
          if (loan.status === 'rejected') return res.status(403).json({ status: 403, error: 'loan is already rejected' });
          if (loan.status === 'approved') return res.status(403).json({ status: 403, error: 'loan is already approved' });
          loan.status = 'rejected';
          loan.rejectedAt = new Date().toLocaleString();
        }
        return res.status(200).json({ status: 200, data: loan });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },
};

module.exports = Loan;
