let viewProofOfPaymentBtn = document.querySelector('.view-proof-of-payment-btn');
let proofOfPaymentModal = document.querySelector('.proof-of-payment-modal');
let closeProofOfPaymentModal = document.querySelector('#close-proof-of-payment-modal');
let tableRow = [];

let repaymentListTable = document.querySelector('.repayment-list-table');
for (let i = 1; i < repaymentListTable.children[0].children.length; i++) {
  tableRow.push(repaymentListTable.children[0].children[i].lastElementChild.children[0]);
}
for (let j = 0; j < tableRow.length; j++){
  tableRow[j].addEventListener('click', () => {
  	proofOfPaymentModal.style.display = 'block';
  });
}

closeProofOfPaymentModal.addEventListener('click', () => {
	proofOfPaymentModal.style.display = 'none';
})
