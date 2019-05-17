
import { user } from '../components/user.js';

const sidebar = document.querySelector('#sidebar');

const pageTitle = document.title;

if ((user.isAdmin === true) && (pageTitle === 'Dashboard')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-desktop nav-icons nav-icon-active">
          </i>dashboard
        </li>
      </a>
      <a href = '../pages/loan/viewAllLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>loans
        </li>
      </a>
      <a href = '../pages/profile/viewAllProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'Dashboard')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-desktop nav-icons nav-icon-active">
          </i>dashboard
        </li>
      </a>
      <a href = '../pages/loan/myLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>my loans
        </li>
      </a>
      <a href = '../pages/profile/myProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === true) && (pageTitle === 'Loan Details')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = './viewAllLoans.html'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-money-check nav-icons nav-icon-active">
          </i>loans
        </li>
      </a>
      <a href = '../profile/viewAllProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'My Loan Details')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = './myLoans.html'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-money-check nav-icons nav-icon-active">
          </i>my loans
        </li>
      </a>
      <a href = '../profile/myProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}


if ((user.isAdmin === true) && (pageTitle === 'All Loans')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-money-check nav-icons nav-icon-active">
          </i>loans
        </li>
      </a>
      <a href = '../profile/viewAllProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'My Loans')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>
          <i class="fas fa-money-check nav-icons nav-icon-active">
          </i>my loans
        </li>
      </a>
      <a href = '../profile/myProfile.html'>
        <li class = 'nav-items'>          <i class="fas fa-address-card nav-icons">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === true) && (pageTitle === 'Client Profile')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '../loan/viewAllLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>loans
        </li>
      </a>
      <a href = './viewAllProfile.html'>
        <li class = 'nav-items nav-items-active'>          
          <i class="fas fa-address-card nav-icons nav-icon-active">
          </i>profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'Complete Profile')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '../loan/myLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>my loans
        </li>
      </a>
      <a href = './myProfile.html'>
        <li class = 'nav-items nav-items-active'>          
          <i class="fas fa-address-card nav-icons nav-icon-active">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === true) && (pageTitle === 'Client List')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '../loan/viewAllLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>loans
        </li>
      </a>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>          
          <i class="fas fa-address-card nav-icons nav-icon-active">
          </i>profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'My Profile')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '../loan/myLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>my loans
        </li>
      </a>
      <a href = '#'>
        <li class = 'nav-items nav-items-active'>          
          <i class="fas fa-address-card nav-icons nav-icon-active">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}

if ((user.isAdmin === false) && (pageTitle === 'Update Profile')) {
  const sidebarContent = `
    <ul class = 'menu-items'>
      <li id = 'site-title'>
        quick credit
      </li>
      <a href = '../dashboard.html'>
        <li class = 'nav-items'>
          <i class="fas fa-desktop nav-icons">
          </i>dashboard
        </li>
      </a>
      <a href = '../loan/myLoans.html'>
        <li class = 'nav-items'>
          <i class="fas fa-money-check nav-icons">
          </i>my loans
        </li>
      </a>
      <a href = './myProfile.html'>
        <li class = 'nav-items nav-items-active'>          
          <i class="fas fa-address-card nav-icons nav-icon-active">
          </i>my profile
        </li>
      </a>
    </ul>
  `;
  sidebar.innerHTML = sidebarContent;
}
