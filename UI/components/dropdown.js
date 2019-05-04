
//When the user clicks on the button, toggle between hiding and showing the dropdown content 
let tableRow = [];
let clientListTable = document.querySelector('.client-list-table');
for (let i = 1; i < clientListTable.children[0].children.length; i++) {
  tableRow.push(clientListTable.children[0].children[i].lastElementChild.children[0].children);
}
for (let j = 0; j < tableRow.length; j++){
  tableRow[j][0].addEventListener('click', () => {
  tableRow[j][1].classList.toggle("show");
  });


}



// Close the dropdown menu if the user clicks outside it 
window.onclick = function(event){
  if (!event.target.matches('.client-list-action-dropdown-btn')) {
    let dropdowns = document.getElementsByClassName("client-list-action-dropdown-content");
    for (let k = 0; k < dropdowns.length; k++){
      let openDropdown = dropdowns[k];
      if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
      }
    }
  }
}




