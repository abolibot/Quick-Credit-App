const loanRepaymentModel = require('../models/LoanRepayment');
const LoanModel = require('../models/Loan');

const { loans } = LoanModel;
const { loanRepayments } = loanRepaymentModel;
const date = new Date();

const LoanRepayment = {
  getALoanRepayments: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
    const ALoanRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.params.loanId, 10));
    return res.status(200).json({ status: 200, data: ALoanRepayments });
  },

  logRepayment: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
    const ALoanRepayment = loanRepayments.find(repayment => repayment.id === parseInt(req.params.id, 10));
    if (!ALoanRepayment) return res.status(404).json({ status: 404, error: 'loan repayment with given id not found' });
    if ((ALoanRepayment.status === 'logged') || (ALoanRepayment.status === 'posted')) return res.status(403).json({ status: 403, error: 'you cannot log an already logged or posted repayment' });
    for (let i = 1; i <= loan.tenor; i += 1) {
      if (i === parseInt(req.params.id, 10)) break;
      if (loanRepayments[i - 1].status === 'pending') return res.status(403).json({ status: 403, error: 'kindly log repayment(s) prior to this one first' });
    }
    ALoanRepayment.status = 'logged';
    ALoanRepayment.loggedAt = date.toUTCString();
    ALoanRepayment.paidAmount = loan.paymentInstallment;
    return res.status(201).json({ status: 201, data: ALoanRepayment });
  },
};

module.exports = LoanRepayment;
