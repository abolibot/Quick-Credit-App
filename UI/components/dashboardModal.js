import { users } from './user.js';

let modalHeader = document.querySelector('.dashboard-modal-content-header');
let moodalHeaderContent = `
	Welcome ${users[0].firstName + "!"} You are a step closer.
`;

modalHeader.innerHTML = moodalHeaderContent;
