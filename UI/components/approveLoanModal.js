let approveLoanBtn = document.querySelector('#approve-loan-btn');
let approveLoanForm = document.querySelector('#approve-loan-modal-form');
let closeApproveLoanModal = document.querySelector('#close-approve-loan-modal');


approveLoanBtn.addEventListener('click', () => {
	document.querySelector('.approve-loan-modal').style.display = 'block';
});

closeApproveLoanModal.addEventListener('click', () => {
	document.querySelector('.approve-loan-modal').style.display = 'none';
})




approveLoanForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.repayment-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#repayment-loader").style.display="none";
	    document.querySelector('.repayment-loader-modal').style.display = 'none';
	    document.querySelector('.approve-loan-modal').style.display = 'none';
	    document.querySelector('.approved-loan-modal').style.display = 'block';
	}, 5000);
	
});
