const moment = require('moment');
const LoanModel = require('../models/Loan');
const loanRepaymentModel = require('../models/LoanRepayment');

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
  logRepayment: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).send('loan with given id not found');
    const ALoanRepayment = loanRepayments.find(repayment => repayment.id === parseInt(req.params.id, 10));
    if (!ALoanRepayment) return res.status(404).send('loan repayment with given id not found');
    if ((ALoanRepayment.status === 'logged') || (ALoanRepayment.status === 'posted')) return res.status(403).send('you cannot log an already logged or posted repayment');
    for (let i = 1; i <= loan.tenor; i += 1) {
      if (i === parseInt(req.params.id, 10)) break;
      if (loanRepayments[i - 1].status === 'pending') return res.status(403).send('kindly log repayment(s) prior to this one first');
    }
    ALoanRepayment.status = 'logged';
    ALoanRepayment.loggedAt = moment().format('Do MMMM YYYY, h:mm a');
    ALoanRepayment.paidAmount = loan.paymentInstallment;
    return res.status(200).send(ALoanRepayment);
  },

  postRepayment: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).send('loan with given id not found');
    const ALoanRepayment = loanRepayments.find(repayment => repayment.id === parseInt(req.params.id, 10));
    if (!ALoanRepayment) return res.status(404).send('loan repayment with given id not found');
    if (ALoanRepayment.status === 'pending') return res.status(403).send('repayment has to be logged first');
    if (ALoanRepayment.status === 'posted') return res.status(403).send('you cannot post an already posted repayment');
    ALoanRepayment.status = 'posted';
    ALoanRepayment.postedAt = moment().format('Do MMMM YYYY, h:mm a');
    const balance = () => {
      let bal;
      const loanPostedRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.params.loanId, 10)).filter(repayment => repayment.status === 'posted');
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
        loan.repaidAt = moment().format('Do MMMM YYYY, h:mm a');
      }
      if (i === parseInt(req.params.id, 10)) break;
      if (loanRepayments[i - 1].status === 'logged') return res.status(403).send('kindly post repayment(s) prior to this one first');
    }

    ALoanRepayment.balance = balance();
    return res.status(200).send(ALoanRepayment);
  },

  getALoanRepayments: (req, res) => {
    const ALoanRepayments = loanRepaymentModel.getALoanRepayments(parseInt(req.params.loanId, 10));
    return res.status(200).send(ALoanRepayments);
  },
};

module.exports = LoanRepayment;
