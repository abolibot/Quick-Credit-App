let isVerified = true;
let hasCurrentLoan = false;

let loanApplicationBtn = document.querySelector('#my-loan-list-apply-for-loan-btn');
if ((isVerified == false) || (hasCurrentLoan == true)){
	loanApplicationBtn.classList.add('disabled');
	loanApplicationBtn.disabled = true;
}
