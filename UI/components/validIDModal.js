let viewValidIdBtn = document.querySelector('.view-valid-id-btn');
let validIdModal = document.querySelector('.valid-id-modal');
let closeValidIdModal = document.querySelector('#close-valid-id-modal');
viewValidIdBtn.addEventListener('click', () => {
	validIdModal.style.display = 'block';
});

closeValidIdModal.addEventListener('click', () => {
	validIdModal.style.display = 'none';
})