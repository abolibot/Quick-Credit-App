const loanRepaymentModel = require('../models/LoanRepayment');
const LoanModel = require('../models/Loan');

const { loans } = LoanModel;

const LoanRepayment = {
  getALoanRepayments: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
    const ALoanRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.params.loanId, 10));
    return res.status(200).json({ status: 200, data: ALoanRepayments });
  },
};

module.exports = LoanRepayment;
