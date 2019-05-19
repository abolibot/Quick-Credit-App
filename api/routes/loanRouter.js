const express = require('express');
const Loan = require('../controllers/Loan');
const LoanRepayment = require('../controllers/LoanRepayment');
const User = require('../controllers/User');

const routes = () => {
  const loanRouter = express.Router();
  loanRouter.route('/')
    .post(User.verifyToken, Loan.createALoan)
    .get(User.verifyToken, Loan.getAllLoans);
  loanRouter.route('/:loanId')
    .get(User.verifyToken, Loan.getALoan);
  loanRouter.route('/:loanId')
    .patch(User.verifyToken, Loan.approveOrRejectLoan);
  loanRouter.route('/:loanId/repayments')
    .get(User.verifyToken, LoanRepayment.getALoanRepayments);
  loanRouter.route('/:loanId/log-repayment/:id')
    .patch(User.verifyToken, LoanRepayment.logRepayment);
  loanRouter.route('/:loanId/post-repayment/:id')
    .patch(User.verifyToken, LoanRepayment.postRepayment);
  return loanRouter;
};

module.exports = routes;
