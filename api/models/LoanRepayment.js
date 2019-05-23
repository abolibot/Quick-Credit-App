const LoanModel = require('../models/Loan');

const { loans } = LoanModel;

class LoanRepayment {
  constructor() {
    this.loanRepayments = [];
  }

  createLoanRepayment(data) {
    const newLoanRepayment = {
      id: this.loanRepayments.length + 1,
      createdOn: new Date().toLocaleString(),
      loanId: data.loanId,
      loanAmount: data.amount,
      monthlyInstallment: data.paymentInstallment,
      status: 'pending',
    };
    this.loanRepayments.push(newLoanRepayment);
    return newLoanRepayment;
  }

  getALoanRepayments(reqLoanId) {
    const loan = loans.find(l => l.loanId === reqLoanId);
    if (!loan) return ('loan with given id not found');
    const ALoanRepayments = this.loanRepayments.filter(repayment => repayment.loanId === loan.loanId);
    return ALoanRepayments;
  }
}

module.exports = new LoanRepayment();
