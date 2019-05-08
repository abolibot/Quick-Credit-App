let rejectLoanBtn = document.querySelector('#reject-loan-btn');
let rejectLoanForm = document.querySelector('#reject-loan-modal-form');
let closeRejectLoanModal = document.querySelector('#close-reject-loan-modal');


rejectLoanBtn.addEventListener('click', () => {
	document.querySelector('.reject-loan-modal').style.display = 'block';
});

closeRejectLoanModal.addEventListener('click', () => {
	document.querySelector('.reject-loan-modal').style.display = 'none';
})




rejectLoanForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.repayment-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#repayment-loader").style.display="none";
	    document.querySelector('.repayment-loader-modal').style.display = 'none';
	    document.querySelector('.reject-loan-modal').style.display = 'none';
	    document.querySelector('.rejected-loan-modal').style.display = 'block';
	}, 5000);
	
});
