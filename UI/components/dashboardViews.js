const pendingVerification = document.querySelector('.dashboard-pending-verification');
const unverified = document.querySelector('dashboard-unverified-profile');
const verifiedPlusLoan = document.querySelector('.dashboard-verified-plus-loan');
const verifiedMinusLoan = document.querySelector('.dashboard-verified-minus-loan');
const adminDashboard = document.querySelector('.dashboard-admin');
const pendingLoanApproval = document.querySelector('.dashboard-verified-plus-pending-loan-approval');
const rejectedLoan = document.querySelector('.dashboard-verified-plus-rejected-loan');

const user = {
  isAdmin: true,
  isVerified: false,
  hasCurrentLoan: false,
  hasPendingLoanApproval: false,
  hasLoanApplicationRejected: false,
  isPendingVerification: false,
  isUnverified: false,
  hasRejectedLoan: false,
};

if (user.admin === true) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'block';
  pendingLoanApproval.style.display = 'none';
  rejectedLoan.style.display = 'none';
}

if (user.isUnverified === true) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'block';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display = 'none';
  rejectedLoan.style.display = 'none';
}

if (user.isPendingVerification === true) {
  pendingVerification.style.display = 'block';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display = 'none';
  rejectedLoan.style.display = 'none';
}

if ((user.isVerified === true) && (user.hasCurrentLoan === true)) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'block';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display = 'none';
  rejectedLoan.style.display = 'none';
}

if ((user.isVerified === true) && (user.hasCurrentLoan === false)) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'block';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display ='none';
  rejectedLoan.style.display = 'none';
}

if (user.hasPendingLoanApproval === true) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display = 'block';
  rejectedLoan.style.display = 'none';
}

if (user.hasRejectedLoan === true) {
  pendingVerification.style.display = 'none';
  unverified.style.display = 'none';
  verifiedPlusLoan.style.display = 'none';
  verifiedMinusLoan.style.display = 'none';
  adminDashboard.style.display = 'none';
  pendingLoanApproval.style.display = 'none';
  rejectedLoan.style.display = 'true';
}
