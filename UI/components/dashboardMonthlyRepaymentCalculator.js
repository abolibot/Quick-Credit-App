document.querySelector('#dashboard-apply-for-loan-modal-amount').addEventListener('input', () => {
	let amount = parseInt(document.querySelector('#dashboard-apply-for-loan-modal-amount').value);
	let interest = ((5/100)*amount);
	let amountPlusLoan = amount + interest;
	let term = document.querySelector('#dashboard-apply-for-loan-modal-term').value;
	let tempAnswer = amountPlusLoan/term;
	let temp = new Intl.NumberFormat({ style: 'currency', currency: 'NGN' }).format(tempAnswer);
	let monthlyRepayment = '&#8358;' + temp;
	document.querySelector('#dashboard-apply-for-loan-modal-td').innerHTML = monthlyRepayment;
});

document.querySelector('#dashboard-apply-for-loan-modal-term').addEventListener('input', () => {
	let amount = parseInt(document.querySelector('#dashboard-apply-for-loan-modal-amount').value);
	let interest = ((5/100)*amount);
	let amountPlusLoan = amount + interest;
	let term = document.querySelector('#dashboard-apply-for-loan-modal-term').value;
	let tempAnswer = amountPlusLoan/term;
	let temp = new Intl.NumberFormat({ style: 'currency', currency: 'NGN' }).format(tempAnswer);
	let monthlyRepayment = '&#8358;' + temp;
	document.querySelector('#dashboard-apply-for-loan-modal-td').innerHTML = monthlyRepayment;
});
