const clientDashboard = document.querySelector('#client-dashboard');
const pendingVerification = document.querySelector('#pending-verification');
const unverified = document.querySelector('#unverified');
const verifiedPlusLoan = document.querySelector('#verified-plus-loan');
const verifiedMinusLoan = document.querySelector('#verified-minus-loan');
const adminDashboard = document.querySelector('#dashboard-admin');
const pendingLoanApproval = document.querySelector('#pending-loan-approval');
const rejectedLoan = document.querySelector('#rejected-loan');
const logRepaymentBtn = document.querySelector('#dashboard-log-repayment-btn');
const applyForLoanBtn = document.querySelector('#dashboard-apply-button');
const updateProfileBtn = document.querySelector('#notification-update-profile');
const viewLoanBtn = document.querySelector('#notification-view-loan');
const currentLoanContent = document.querySelector('#current-loan-overview-content');
const verificationStatusBtn = document.querySelector('#my-details-verification-status-btn');

const user = {
  isAdmin: true,
  isVerifiedPlusLoan: false,
  isVerifiedMinusLoan: false,
  isPendingLoanApproval: false,
  isPendingVerification: false,
  isUnverified: false,
  hasRejectedLoan: false,
};

if (user.isAdmin === true) {
  adminDashboard.classList.remove('hide');
}

if (user.isVerifiedPlusLoan === true) {
  clientDashboard.classList.remove('hide');
  verifiedPlusLoan.classList.remove('hide');
  logRepaymentBtn.classList.remove('hide');
}

if (user.isVerifiedMinusLoan === true) {
  clientDashboard.classList.remove('hide');
  verifiedMinusLoan.classList.remove('hide');
  applyForLoanBtn.classList.remove('disabled');
  applyForLoanBtn.disabled = false;
  currentLoanContent.classList.add('hide');
}

if (user.isPendingLoanApproval === true) {
  clientDashboard.classList.remove('hide');
  pendingLoanApproval.classList.remove('hide');
  viewLoanBtn.classList.remove('hide');
  currentLoanContent.classList.add('hide');
}

if (user.isPendingVerification === true) {
  clientDashboard.classList.remove('hide');
  pendingVerification.classList.remove('hide');
  verificationStatusBtn.innerHTML = 'Pending';
  verificationStatusBtn.classList.remove('verification-status-btn-verified');
  verificationStatusBtn.classList.add('verification-status-btn-pending');
  currentLoanContent.classList.add('hide');
}

if (user.isUnverified === true) {
  clientDashboard.classList.remove('hide');
  unverified.classList.remove('hide');
  updateProfileBtn.classList.remove('hide');
  currentLoanContent.classList.add('hide');
  verificationStatusBtn.classList.remove('verification-status-btn-verified');
  verificationStatusBtn.classList.add('verification-status-btn-unverified');
  verificationStatusBtn.innerHTML = 'Unverified';
}

if (user.hasRejectedLoan === true) {
  clientDashboard.classList.remove('hide');
  rejectedLoan.classList.remove('hide');
  currentLoanContent.classList.add('hide');
}
