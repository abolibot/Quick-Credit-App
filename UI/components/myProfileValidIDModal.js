let viewValidIdBtn = document.querySelector('.my-profile-view-valid-id-btn');
let validIdModal = document.querySelector('.my-profile-valid-id-modal');
let closeValidIdModal = document.querySelector('#my-profile-close-valid-id-modal');
viewValidIdBtn.addEventListener('click', () => {
  validIdModal.style.display = 'block';
});

closeValidIdModal.addEventListener('click', () => {
  validIdModal.style.display = 'none';
});
