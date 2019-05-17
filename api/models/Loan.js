class Loan {
  constructor() {
    this.loans = [];
    this.date = new Date();
  }

  createLoan(data, user) {
    const newLoan = {
      loanId: this.loans.length + 1,
      userDetails: {
        email: user.email,
        bank: user.bank,
        accountNumber: user.accountNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      createdOn: this.date.toUTCString(),
      status: 'pending',
      repaid: false,
      tenor: parseInt(data.tenor, 10),
      amount: parseInt(data.amount, 10),
      paymentInstallment: (parseInt(data.amount, 10) + (0.05 * parseInt(data.amount, 10))) / parseInt(data.tenor, 10),
      balance: parseInt(data.amount, 10) + (0.05 * parseInt(data.amount, 10)),
      interest: 0.05 * parseInt(data.amount, 10),
    };
    this.loans.push(newLoan);
    return newLoan;
  }

  getAUserLoans(userEmail) {
    const userLoans = this.loans.filter(loan => loan.userDetails.email === userEmail);
    return userLoans;
  }
}

module.exports = new Loan();
