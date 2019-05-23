require('dotenv').config();
const jwt = require('jsonwebtoken');
const loanRepaymentModel = require('../models/LoanRepayment');
const LoanModel = require('../models/Loan');

const { loans } = LoanModel;
const { loanRepayments } = loanRepaymentModel;

const arraySum = (arr) => {
  let sumOfElements = 0;
  for (let z = 0; z < arr.length; z += 1) {
    sumOfElements += arr[z];
  }
  return sumOfElements;
};


const LoanRepayment = {
  getALoanRepayments: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const loan = loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10));
        if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
      if ((authData.isAdmin === true) || (authData.email === loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10)).userDetails.email)) {
        const ALoanRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.value.params.loanId, 10));
        return res.status(200).json({ status: 200, data: ALoanRepayments });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  logRepayment: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const loan = loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10));
      if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
      if ((authData.isAdmin === false) && (authData.email === loan.userDetails.email)) {
        const ALoanRepayment = loanRepayments.find(repayment => repayment.id === parseInt(req.value.params.id, 10));
        if (!ALoanRepayment) return res.status(404).json({ status: 404, error: 'loan repayment with given id not found' });
        if ((ALoanRepayment.status === 'logged') || (ALoanRepayment.status === 'posted')) return res.status(403).json({ status: 403, error: 'you cannot log an already logged or posted repayment' })
        for (let i = 1; i <= loan.tenor; i += 1) {
          if (i === parseInt(req.value.params.id, 10)) break;
          if (loanRepayments[i - 1].status === 'pending') return res.status(403).json({ status: 403, error: 'kindly log repayment(s) prior to this one first' });
        }
        ALoanRepayment.status = 'logged';
        ALoanRepayment.loggedAt = new Date().toLocaleString();
        ALoanRepayment.paidAmount = loan.paymentInstallment;
        return res.status(200).json({ status: 200, data: ALoanRepayment });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },

  postRepayment: (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, authData) => {
      if (err) return res.status(401).json({ status: 401, error: 'invalid token' });
      const loan = loans.find(l => l.loanId === parseInt(req.value.params.loanId, 10));
      if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
      if (authData.isAdmin === true) {
        const ALoanRepayment = loanRepayments.find(repayment => repayment.id === parseInt(req.value.params.id, 10));
        if (!ALoanRepayment) return res.status(404).json({ status: 404, error: 'loan repayment with given id not found' });
        if (ALoanRepayment.status === 'pending') return res.status(403).json({ status: 403, error: 'repayment has to be logged first' });
        if (ALoanRepayment.status === 'posted') return res.status(403).json({ status: 403, error: 'you cannot post an already posted repayment' });
        ALoanRepayment.status = 'posted';
        ALoanRepayment.postedAt = new Date().toLocaleString();
        const balance = () => {
          let bal;
          const loanPostedRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.value.params.loanId, 10)).filter(repayment => repayment.status === 'posted');
          if (loanPostedRepayments.length === 0) {
            bal = loan.paymentInstallment;
            return bal;
          }
          const amountPosted = [];
          loanPostedRepayments.forEach(repayment => amountPosted.push(repayment.paidAmount));
          bal = (loan.amount + loan.interest) - arraySum(amountPosted);
          loan.balance = bal;
          return bal;
        };

        for (let i = 1; i <= loan.tenor; i += 1) {
          if (i === loan.tenor) {
            loan.repaid = true;
            loan.repaidAt = new Date().toLocaleString();
          }
          if (i === parseInt(req.value.params.id, 10)) break;
          if (loanRepayments[i - 1].status === 'logged') return res.status(403).json({ status: 403, error: 'kindly post repayment(s) prior to this one first' });
        }
        ALoanRepayment.balance = balance();
        return res.status(200).json({ status: 200, data: ALoanRepayment });
      }
      return res.status(401).json({ status: 401, error: 'You do not have permissions to access this endpoint' });
    });
  },
};
module.exports = LoanRepayment;
