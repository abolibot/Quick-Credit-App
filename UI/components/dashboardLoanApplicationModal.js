let dashboardApplyForLoanBtn = document.querySelector('#dashboard-apply-for-loan-btn');
let dashboardApplyForLoanForm = document.querySelector('#dashboard-apply-for-loan-modal-form');
let dashboardCloseApplyForLoanModal = document.querySelector('#dashboard-close-apply-for-loan-modal');


dashboardApplyForLoanBtn.addEventListener('click', () => {
	document.querySelector('.dashboard-apply-for-loan-modal').style.display = 'block';
});

dashboardCloseApplyForLoanModal.addEventListener('click', () => {
	document.querySelector('.dashboard-apply-for-loan-modal').style.display = 'none';
})




dashboardApplyForLoanForm.addEventListener('submit', () => {

	event.preventDefault();
	document.querySelector('.repayment-loader-modal').style.display = 'block';
	setTimeout(function() {
	    document.querySelector("#repayment-loader").style.display="none";
	    document.querySelector('.repayment-loader-modal').style.display = 'none';
	    document.querySelector('.dashboard-apply-for-loan-modal').style.display = 'none';
	    document.querySelector('.dashboard-loan-applied-modal').style.display = 'block';
	}, 5000);
	
});