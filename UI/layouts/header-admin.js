const pageTitle = document.title;
let signOutUrl;
let imgUrl;

if (pageTitle === 'Dashboard') {
  signOutUrl = './sign-in-admin.html';
  imgUrl = './resources/admin.jpg';
}

if (pageTitle === 'Loan Details') {
  signOutUrl = '../sign-in-admin.html';
  imgUrl = '../resources/admin.jpg';
}

if (pageTitle === 'All Loans') {
  signOutUrl = '../sign-in-admin.html';
  imgUrl = '../resources/admin.jpg';
}

if (pageTitle === 'Client Profile') {
  signOutUrl = '../sign-in-admin.html';
  imgUrl = '../resources/admin.jpg';
}

if (pageTitle === 'Client List') {
  signOutUrl = '../sign-in-admin.html';
  imgUrl = '../resources/admin.jpg';
}

const header = document.querySelector('#header');
const pageHeader = document.querySelector('#page-title');
const headerContent = `
  <a href = '#' id = 'menu-toggler-anchor'>
    <i class="fas fa-align-justify menu-toggler">
    </i>
  </a>
  <div class = 'header-profile-photo'>
      <img src = "${imgUrl}" alt = "placeholder image" class = "header-user-image">
  </div>
  
  <div class = 'name-and-dropdown-icon'>
    <button class = 'sign-out-dropdown-btn'>
      <i class="fas fa-angle-down menu-dropdown-icon"></i><span class = 'name'>Admin</span>
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

const menuTogglerAnchor = document.querySelector('#menu-toggler-anchor');
const sidebar = document.querySelector('#sidebar');
const content = document.querySelector('#content');

menuTogglerAnchor.addEventListener('click', () => {
  if (sidebar.classList.contains('hide')) {
    sidebar.classList.remove('hide');
    content.style.width = '85%';
  } else {
    sidebar.classList.add('hide');
    content.style.width = '100%';
  }
});
