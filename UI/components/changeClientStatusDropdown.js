let changeStatusBtn = document.querySelector('.change-status-dropdown-btn');
let changeStatusDropdown = document.querySelector('.change-status-dropdown-content');
let dropdown = document.querySelector(".change-status-dropdown-content");
changeStatusBtn.addEventListener('click', () => {
  changeStatusDropdown.classList.toggle("show");
});

// Close the dropdown menu if the user clicks outside it
window.onclick = function(event){
  if (!event.target.matches('.change-status-dropdown-btn')) {
    if (dropdown.classList.contains('show')) {
  		dropdown.classList.remove('show');
    }
  }
}

let changeStatusToVerify = document.querySelector('.change-status-to-verify');
let changeStatusToUnverify = document.querySelector('.change-status-to-unverify');
let clientStatusPending = document.querySelector('#client-status-btn-pending');
let clentStatusVerified = document.querySelector('#client-status-btn-verified');
let clienStatusUnverified = document.querySelector('#client-status-btn-unverified');


changeStatusToVerify.addEventListener('click', () => {
	if (clienStatusUnverified.classList.contains('show')){
		clienStatusUnverified.classList.remove('show');
		clienStatusUnverified.classList.add('hide');
	}
	clientStatusPending.classList.add('hide');
	clentStatusVerified.classList.remove('hide');
	clentStatusVerified.classList.add('show');
	dropdown.classList.remove('show');
})

changeStatusToUnverify.addEventListener('click', () => {
	if (clentStatusVerified.classList.contains('show')){
		clentStatusVerified.classList.remove('show');
		clentStatusVerified.classList.add('hide');
	}

	clientStatusPending.classList.add('hide');
	clienStatusUnverified.classList.remove('hide');
	clienStatusUnverified.classList.add('show');
	dropdown.classList.remove('show');
});
