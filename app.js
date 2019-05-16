const express = require('express');
//const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
const User = require('./controllers/User');
const Loan = require('./controllers/Loan');
const LoanRepayment = require('./controllers/LoanRepayment');

const app = express();
// const router = express.Router();
// app.use(bodyParser.json());
// app.use(expressValidator());
// app.use('/api', router);
// app.use(express.json());
const port = process.env.PORT || 3000;

app.post('/api/v1/auth/signup', User.signup);
app.post('/api/v1/auth/signin', User.signin);
app.get('/api/v1/users', User.getAllUsers);
app.get('/api/v1/users/:id', User.getAUser);
app.patch('/api/v1/users/:emailAddress/verify', User.verifyUser);
app.patch('/api/v1/users/:emailAddress/unverify', User.unVerifyUser);
app.patch('/api/v1/users/:emailAddress/completeProfile', User.completeProfile);
app.patch('/api/v1/users/:emailAddress/updateProfile', User.updateProfile);
app.post('/api/v1/loans', Loan.createALoan);
app.get('/api/v1/loans', Loan.getAllLoans);
app.get('/api/v1/loans/:loanId', Loan.getALoan);
app.patch('/api/v1/loans/:loanId/approve', Loan.approveLoan);
app.patch('/api/v1/loans/:loanId/reject', Loan.rejectLoan);
app.get('/api/v1/loans/:loanId/repayments', LoanRepayment.getALoanRepayments);
app.patch('/api/v1/loans/:loanId/log-repayment/:id', LoanRepayment.logRepayment);
app.patch('/api/v1/loans/:loanId/post-repayment/:id', LoanRepayment.postRepayment);


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
