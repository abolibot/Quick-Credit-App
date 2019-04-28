import { users } from '../components/user.js';
import { countDownToNextRepayment, getNextDueRepayment, getTotalDue, amountOfRepaymentsPosted, numberOfRepaymentsPosted, numberOfRepaymentsLeft, checkUserType} from '../components/user.js';


let header = document.querySelector('#header');
let pageTitle = document.querySelector('#page-title');
let headerContent = `
	<div class = 'header-profile-photo'>
			<img src = "${users[0].profilePhoto}" alt = "placeholder image" class = "header-user-image">
	</div>
	
	<div class = 'name-and-dropdown-icon'>
		<i class="fas fa-angle-down menu-dropdown-icon"></i>
		<p class = 'name'> ${users[0].firstName + " " + users[0].lastName} </p>
	</div>
	<hr class = 'header-separator' />
	<i class="fas fa-bell header-notification"></i>
`;

header.innerHTML = headerContent;
pageTitle.innerHTML = document.title;
