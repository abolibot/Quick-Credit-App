
const changeStatusBtn = document.querySelector('.change-status-dropdown-btn');
const changeStatusDropdown = document.querySelector('.change-status-dropdown-content');
changeStatusBtn.addEventListener('click', () => {
  changeStatusDropdown.classList.toggle('show');
});

// Close the dropdown menu if the user clicks outside it
window.onclick = (event) => {
  if (!event.target.matches('.change-status-dropdown-btn')) {
    if (changeStatusDropdown.classList.contains('show')) {
      changeStatusDropdown.classList.remove('show');
    }
  }
};

const changeStatusToVerify = document.querySelector('.change-status-to-verify');
const changeStatusToUnverify = document.querySelector('.change-status-to-unverify');
const clientStatusPending = document.querySelector('#client-status-btn-pending');
const clentStatusVerified = document.querySelector('#client-status-btn-verified');
const clienStatusUnverified = document.querySelector('#client-status-btn-unverified');


changeStatusToVerify.addEventListener('click', () => {
  if (clienStatusUnverified.classList.contains('show')) {
    clienStatusUnverified.classList.remove('show');
    clienStatusUnverified.classList.add('hide');
  }
  clientStatusPending.classList.add('hide');
  clentStatusVerified.classList.remove('hide');
  clentStatusVerified.classList.add('show');
  changeStatusDropdown.classList.remove('show');
});

changeStatusToUnverify.addEventListener('click', () => {
  if (clentStatusVerified.classList.contains('show')) {
    clentStatusVerified.classList.remove('show');
    clentStatusVerified.classList.add('hide');
  }

  clientStatusPending.classList.add('hide');
  clienStatusUnverified.classList.remove('hide');
  clienStatusUnverified.classList.add('show');
  changeStatusDropdown.classList.remove('show');
});
