const logRepaymentBtn = document.querySelector('#dashboard-log-repayment-btn');
const logRepaymentModal = document.querySelector('.log-repayment-modal');
const closeLogRepaymentModal = document.querySelector('#close-log-repayment-modal');

logRepaymentBtn.addEventListener('click', () => {
  logRepaymentModal.style.display = 'block';
});

closeLogRepaymentModal.addEventListener('click', () => {
  logRepaymentModal.style.display = 'none';
});
