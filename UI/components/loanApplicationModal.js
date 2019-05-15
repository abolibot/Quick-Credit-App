let myLoansApplyForLoanBtn = document.querySelector('#my-loan-list-apply-for-loan-btn');
let myLoansApplyForLoanForm = document.querySelector('#apply-for-loan-modal-form');
let myLoansCloseApplyForLoanModal = document.querySelector('#close-apply-for-loan-modal');


myLoansApplyForLoanBtn.addEventListener('click', () => {
	document.querySelector('.apply-for-loan-modal').style.display = 'block';
});

myLoansCloseApplyForLoanModal.addEventListener('click', () => {
	document.querySelector('.apply-for-loan-modal').style.display = 'none';
})



myLoansApplyForLoanForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.apply-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#apply-loader").style.display="none";
	    document.querySelector('.apply-loader-modal').style.display = 'none';
	    document.querySelector('.apply-for-loan-modal').style.display = 'none';
	    document.querySelector('.loan-applied-modal').style.display = 'block';
	}, 5000);
	
});
