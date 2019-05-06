let postRepaymentBtn = document.querySelector('#post-repayment-btn');
let postRepaymentForm = document.querySelector('#post-repayment-modal-form');
let closePostRepaymentModal = document.querySelector('#close-post-repayment-modal');


postRepaymentBtn.addEventListener('click', () => {
	document.querySelector('.post-repayment-modal').style.display = 'block';
});

closePostRepaymentModal.addEventListener('click', () => {
	document.querySelector('.post-repayment-modal').style.display = 'none';
})




postRepaymentForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.repayment-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#repayment-loader").style.display="none";
	    document.querySelector('.repayment-loader-modal').style.display = 'none';
	    document.querySelector('.post-repayment-modal').style.display = 'none';
	    document.querySelector('.repayment-posted-modal').style.display = 'block';
	}, 5000);
	
});
