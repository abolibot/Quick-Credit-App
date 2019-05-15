import { users } from '../components/user.js';
import { user } from '../components/user.js';

let name;
if (user.isAdmin === true) {
  name = 'Admin';
} else {
  name = `${users[0].firstName} ${users[0].lastName}`;
}

const pageTitle = document.title;
let signOutUrl;

if (pageTitle === 'Dashboard') {
  signOutUrl = './sign-in.html';
}

if (pageTitle === 'My Loan Details') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'My Loans') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'Loan Details') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'All Loans') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'Complete Profile') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'My Profile') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'Update Profile') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'Client Profile') {
  signOutUrl = '../sign-in.html';
}

if (pageTitle === 'Client List') {
  signOutUrl = '../sign-in.html';
}

const header = document.querySelector('#header');
const pageHeader = document.querySelector('#page-title');
const headerContent = `
  <div class = 'header-profile-photo'>
      <img src = "${users[0].profilePhoto}" alt = "placeholder image" class = "header-user-image">
  </div>
  
  <div class = 'name-and-dropdown-icon'>
    <button class = 'sign-out-dropdown-btn'>
      <i class="fas fa-angle-down menu-dropdown-icon"></i><span class = 'name'>${name}</span>
    </button>
    <div>
      <a href = '${signOutUrl}' class = "sign-out-dropdown-content">sign out</a>
    </div>
  </div>
`;

header.innerHTML = headerContent;
pageHeader.innerHTML = document.title;

const headerName = document.querySelector('.sign-out-dropdown-btn');
const signOutDropdown = document.querySelector('.sign-out-dropdown-content');
headerName.addEventListener('click', () => {
  signOutDropdown.classList.toggle('show');
});

// Close the dropdown menu if the user clicks outside it
window.onclick = (event) => {
  if (!event.target.matches('.sign-out-dropdown-btn')) {
    if (signOutDropdown.classList.contains('show')) {
      signOutDropdown.classList.remove('show');
    }
  }
};
