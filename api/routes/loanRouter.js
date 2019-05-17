const express = require('express');
const Loan = require('../controllers/Loan');
const LoanRepayment = require('../controllers/LoanRepayment');

const routes = () => {
  const loanRouter = express.Router();
  loanRouter.route('/')
    .post(Loan.createALoan)
    .get(Loan.getAllLoans);
  loanRouter.route('/:loanId')
    .get(Loan.getALoan);
  loanRouter.route('/:loanId')
    .patch(Loan.approveOrRejectLoan);
  loanRouter.route('/:loanId/repayments')
    .get(LoanRepayment.getALoanRepayments);
  loanRouter.route('/:loanId/log-repayment/:id')
    .patch(LoanRepayment.logRepayment);
  return loanRouter;
};

module.exports = routes;
