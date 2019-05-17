const express = require('express');
const Loan = require('../controllers/Loan');

const routes = () => {
  const loanRouter = express.Router();
  loanRouter.route('/')
    .post(Loan.createALoan)
    .get(Loan.getAllLoans);
  loanRouter.route('/:loanId')
    .get(Loan.getALoan);

  return loanRouter;
};

module.exports = routes;
