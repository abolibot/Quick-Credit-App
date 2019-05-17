const moment = require('moment');
const LoanModel = require('../models/Loan');
const UserModel = require('../models/User');
const loanRepaymentModel = require('../models/LoanRepayment');

const { loans } = LoanModel;
const { users } = UserModel;
const date = new Date();

const getAUserApprovedLoans = (userLoans) => {
  const userApprovedLoans = userLoans.filter(loan => loan.status === 'approved');
  return userApprovedLoans;
};

const getAUserPendingLoans = (userLoans) => {
  const userPendingLoans = userLoans.filter(loan => loan.status === 'pending');
  return userPendingLoans;
};


const Loan = {
  createALoan: (req, res) => {
    const user = users.find(u => u.email === req.body.email);
    if (!user) return res.status(404).json({ status: 404, error: 'user with email doesn\'t exist' });
    if (user.status !== 'verified') return res.status(401).json({ status: 401, error: 'user cannot apply for loan because user is not verified' });
    const userLoans = LoanModel.getAUserLoans(user.email);
    const userPendingLoans = getAUserPendingLoans(userLoans);
    if (userPendingLoans.length !== 0) return res.status(403).json({ status: 403, error: 'user cannot apply for more than one loan at a time' });
    const userCurrentLoans = getAUserApprovedLoans(userLoans).filter(loan => loan.repaid === false);
    if (userCurrentLoans.length !== 0) return res.status(403).json({ status: 403, error: 'user has a current loan' });
    const loan = LoanModel.createLoan(req.body, user);
    return res.status(201).json({ status: 201, data: loan });
  },

  getAllLoans: (req, res) => {
    const query = {};
    if (req.query.status && req.query.repaid) {
      query.status = req.query.status;
      query.repaid = req.query.repaid;
      const loansByStatus = loans.filter(loan => loan.status === query.status);
      const loansByRepayment = loansByStatus.filter(loan => loan.repaid.toString() === query.repaid);
      if (loansByRepayment.length === 0) return res.status(404).json({ status: 404, error: `there are no ${query.status} loans with repaid: ${query.repaid}` });
      return res.status(200).json({ status: 200, data: loansByRepayment });
    }
    if (req.query.status) {
      query.status = req.query.status;
      const loansByStatus = loans.filter(l => l.status === query.status);
      if (loansByStatus.length === 0) return res.status(404).json({ status: 404, error: `there are no loans with ${query.status} status` });
      return res.status(200).json({ status: 200, data: loansByStatus });
    }

    return res.status(200).json({ status: 200, data: loans });
  },

  getALoan: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id not found' });
    return res.status(200).json({ status: 200, data: loan });
  },

  approveOrRejectLoan: (req, res) => {
    const loan = loans.find(l => l.loanId === parseInt(req.params.loanId, 10));
    if (!loan) return res.status(404).json({ status: 404, error: 'loan with given id doesn\'t exist' });
    if (req.body.status === 'approved') {
      if (loan.status === 'approved') return res.status(403).json({ status: 403, error: 'loan is already approved' });
      loan.status = 'approved';
      loan.approvedAt = new Date();

      for (let i = 1; i <= loan.tenor; i += 1) {
        const loanRepayment = loanRepaymentModel.createLoanRepayment(loan);
        loanRepayment.dueDate = moment().add(i * 30, 'days').format('Do MMM YY');
      }
    }
    if (req.body.status === 'rejected') {
      if (loan.status === 'rejected') return res.status(403).json({ status: 403, error: 'loan is already rejected' });
      loan.status = 'rejected';
      loan.rejectedAt = date.toUTCString();
    }
    return res.status(200).json({ status: 200, data: loan });
  },
};


module.exports = Loan;
