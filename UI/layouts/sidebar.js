import { users } from '../components/user.js';
import { checkUserType } from '../components/user.js';

let sidebar = document.querySelector('#sidebar');
let sidebarContent = `
	<ul class = 'menu-items'>
		<li id = 'site-title'>
			quick credit
		</li>
		<li class = 'nav-items nav-item-active'>
			<i class="fas fa-desktop nav-icons nav-icon-active"></i>dashboard
		</li>
		<li class = 'nav-items'>
			<i class="fas fa-money-check nav-icons"></i>my loans
		</li>
		<li class = 'nav-items'>
			<i class="fas fa-address-card nav-icons"></i>my profile
		</li>
	</ul>
`;

sidebar.innerHTML = sidebarContent;