let logRepaymentBtn = document.querySelector('#loan-details-page-log-repayment-btn');
let logRepaymentModal = document.querySelector('.log-repayment-modal');
let closeLogRepaymentModal = document.querySelector('#close-log-repayment-modal');

logRepaymentBtn.addEventListener('click', () => {
	logRepaymentModal.style.display = 'block';
});

closeLogRepaymentModal.addEventListener('click', () => {
	logRepaymentModal.style.display = 'none';
})
