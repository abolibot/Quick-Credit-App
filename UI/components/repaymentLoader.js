let repaymentSubmitBtn = document.querySelector('#repayment-submit-btn');
let logRepaymentForm = document.querySelector('#log-repayment-modal-form');
let closeRepaymentLoggedModal = document.querySelector('#close-repayment-logged-modal');

logRepaymentForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.repayment-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#repayment-loader").style.display="none";
	    document.querySelector('.repayment-loader-modal').style.display = 'none';
	    document.querySelector('.log-repayment-modal').style.display = 'none';
	    document.querySelector('.repayment-logged-modal').style.display = 'block';
	}, 5000);
	
});
