const express = require('express');
const Loan = require('../controllers/Loan');

const routes = () => {
  const loanRouter = express.Router();
  loanRouter.route('/')
    .post(Loan.createALoan);

  return loanRouter;
};

module.exports = routes;
