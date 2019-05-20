require('dotenv').config();
const moment = require('moment');
const jwt = require('jsonwebtoken');
const LoanModel = require('../models/Loan');
const UserModel = require('../models/User');
const loanRepaymentModel = require('../models/LoanRepayment');

const { loans } = LoanModel;
const { users } = UserModel;

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
    console.log(req.value.body);
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const user = users.find(u => u.email === req.value.body.email);
      if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist, you need to sign up first' });
      if (authData.isAdmin === false) {
        if (user.status !== 'verified') return res.status(403).json({ status: 403, error: 'user cannot apply for loan because user is not verified' });
        const userLoans = LoanModel.getAUserLoans(user.email);
        const userPendingLoans = getAUserPendingLoans(userLoans);
        if (userPendingLoans.length !== 0) return res.status(403).json({ status: 403, error: 'user cannot apply for more than one loan at a time' });
        const userCurrentLoans = getAUserApprovedLoans(userLoans).filter(loan => loan.repaid === false);
        if (userCurrentLoans.length !== 0) return res.status(403).json({ status: 403, error: 'user has a current loan' });
        const loan = LoanModel.createLoan(req.value.body, user);
        return res.status(201).json({ status: 201, data: loan });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  getAllLoans: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      if ((authData.isAdmin === true) || (authData.email === req.value.query.email)) {
        const query = {};
        if (req.value.query.status && req.value.query.repaid) {
          query.status = req.value.query.status;
          query.repaid = req.value.query.repaid;
          const loansByStatus = loans.filter(loan => loan.status === query.status);
          const loansByRepayment = loansByStatus.filter(loan => loan.repaid.toString() === query.repaid);
          if (loansByRepayment.length === 0) return res.status(404).json({ status: 404, error: `there are no ${query.status} loans with repaid: ${query.repaid}` });
          return res.status(200).json({ status: 200, data: loansByRepayment });
        }
        if (req.value.query.status) {
          query.status = req.value.query.status;
          const loansByStatus = loans.filter(l => l.status === query.status);
          if (loansByStatus.length === 0) return res.status(404).json({ status: 404, error: `there are no loans with ${query.status} status` });
          return res.status(200).json({ status: 200, data: loansByStatus });
        }
        if (req.value.query.email) {
          query.email = req.value.query.email;
          const loansByUser = loans.filter(l => l.userDetails.email === query.email);
          if (loansByUser.length === 0) return res.status(404).json({ status: 404, error: `user with email ${query.email} has no loans` });
        }

        return res.status(200).json({ status: 200, data: loans });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  getALoan: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const loan = loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10));
      if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
      if ((authData.isAdmin === true) || (authData.email === loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10)).userDetails.email)) {
        return res.status(200).json({ status: 200, data: loan });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
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
