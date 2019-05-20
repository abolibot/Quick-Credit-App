const express = require('express');
const Loan = require('../controllers/Loan');
const LoanRepayment = require('../controllers/LoanRepayment');
const User = require('../controllers/User');
const { validateBody, validateIdParam, validateQuery, schemas } = require('../validator');

const routes = () => {
  const loanRouter = express.Router();
  loanRouter.route('/')
    .post(validateBody(schemas.createLoanSchema), User.verifyToken, Loan.createALoan)
    .get(validateQuery(schemas.loanByCategorySchema), User.verifyToken, Loan.getAllLoans);
  loanRouter.route('/:loanId')
    .get(validateIdParam(schemas.loanIdParamSchema), User.verifyToken, Loan.getALoan);
  loanRouter.route('/:loanId')
    .patch(validateIdParam(schemas.loanIdParamSchema), User.verifyToken, Loan.approveOrRejectLoan);
  loanRouter.route('/:loanId/repayments')
    .get(validateIdParam(schemas.loanIdParamSchema), User.verifyToken, LoanRepayment.getALoanRepayments);
  loanRouter.route('/:loanId/log-repayment/:id')
    .patch(validateIdParam(schemas.loanIdParamSchema), User.verifyToken, LoanRepayment.logRepayment);
  loanRouter.route('/:loanId/post-repayment/:id')
    .patch(validateIdParam(schemas.loanIdParamSchema), User.verifyToken, LoanRepayment.postRepayment);
  return loanRouter;
};

module.exports = routes;
