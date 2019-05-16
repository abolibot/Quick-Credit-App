const moment = require('moment');
const LoanModel = require('../models/Loan');
const UserModel = require('../models/User');
const loanRepaymentModel = require('../models/LoanRepayment');

const { loans } = LoanModel;
const { users } = UserModel;

const getAUserApprovedLoans = (userLoans) => {
  const userApprovedLoans = userLoans.filter(loan => loan.status === 'approved');
  return userApprovedLoans;
};

const getAUserPendingLoans = (userLoans) => {
  const userPendingLoans = userLoans.filter(loan => loan.status === 'pending');
  return userPendingLoans;
};

/*
const getAllApprovedLoans = (loans) => {
  const allApprovedLoans = loans.filter(loan => loan.status === 'approved');
  return allApprovedLoans;
};

*/

const Loan = {
  createALoan: (req, res) => {
    const user = users.find(u => u.emailAddress === req.body.emailAddress);
    if (!user) return res.status(404).send('user with email doesn\'t exist');
    if (user.status !== 'verified') return res.status(401).send('user cannot apply for loan because user is not verified');
    const userLoans = LoanModel.getAUserLoans(user.emailAddress);
    const userPendingLoans = getAUserPendingLoans(userLoans);
    if (userPendingLoans.length !== 0) return res.status(403).send('user cannot apply for more than one loan at a time');
    const userCurrentLoans = getAUserApprovedLoans(userLoans).filter(loan => loan.repaid === false);
    if (userCurrentLoans.length !== 0) return res.status(403).send('user has a current loan');
    const loan = LoanModel.createLoan(req.body, user);
    return res.status(201).send(loan);
  },

  getAllLoans: (req, res) => {
    const query = {};
    if (req.query.status && req.query.repaid) {
      query.status = req.query.status;
      query.repaid = req.query.repaid;
      const loansByStatus = loans.filter(loan => loan.status === query.status);
      const loansByRepayment = loansByStatus.filter(loan => loan.repaid.toString() === query.repaid);
      if (loansByRepayment.length === 0) return res.status(404).send(`there are no ${query.status} loans with repaid: ${query.repaid}`);
      return res.status(200).send(loansByRepayment);
    }
    if (req.query.status) {
      query.status = req.query.status;
      const loansByStatus = loans.filter(l => l.status === query.status);
      if (loansByStatus.length === 0) return res.status(404).send(`there are no loans with ${query.status} status`);
      return res.status(200).send(loansByStatus);
    }

    return res.status(200).send(loans);
  },

  getALoan: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).send('loan with given id not found');
    return res.send(loan);
  },

  approveLoan: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).send('loan with given id doesn\'t exist');
    if (loan.status === 'approved') return res.status(403).send('loan is already approved');
    loan.status = 'approved';
    loan.approvedAt = moment().format('Do MMMM YYYY, h:mm a');

    for (let i = 1; i <= loan.tenor; i += 1) {
      const loanRepayment = loanRepaymentModel.createLoanRepayment(loan);
      loanRepayment.dueDate = moment().add(i * 30, 'days').format('Do MMM YY');
    }
    return res.status(200).send(loan);
  },

  rejectLoan: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).send('loan with given id doesn\'t exist');
    if (loan.status === 'rejected') return res.status(403).send('loan is already rejected');
    loan.status = 'rejected';
    loan.rejectedAt = moment().format('Do MMMM YYYY, h:mm a');
    return res.status(200).send(loan);
  },


};


module.exports = Loan;
