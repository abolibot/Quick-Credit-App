
const user = {
  isAdmin: false,
  isVerifiedPlusLoan: true,
  isVerifiedMinusLoan: false,
  isPendingLoanApproval: false,
  isPendingVerification: false,
  isUnverified: false,
  hasRejectedLoan: false,
};

let users = [
	{
 		id: 1,
 		type: 'client',
 		firstName: 'Oluwatobi',
 		lastName: 'Alaran',
 		dob: new Date(1900, 2, 2),
 		sex: 'male',
 		emailAddress: 'alarantobiloba@gmail.com',
 		phoneNumber: '08023417433',
 		idCard: "../resources/id.jpg",
 		profilePhoto: "../resources/profile-photo.jpg",
 		homeAddress: '202, Ikorodu Road, Onipanu. Lagos',
 		employmentStatus: 'employed',
 		employerOrBusinessName: 'Andela',
 		workAddress: '256, Ikorodu Road, Anthony. Lagos',
 		bvn: '12345678910',
 		bankName: 'Stanbic IBTC',
 		bankAccountNumber: '01987654321',
 		loans: [
 			{
 				id: 1,
 				amount: 300000,
 				term: 3,
 				dateOfApplication: new Date(2019, 2, 20),
 				repayments: [
 					{
 						repaymentId: 1,
 						repaymentStatus: 'posted',
 						dueDate: new Date(2019, 3, 19),
 						dateLogged: new Date(2019, 3, 19),
 						repaymentDueAmount: 100000,
 						amountLogged: 100000,
 						amountPosted: 100000,
 						proofOfPayment: '../resources/repayment-proof-1.jpg'
 					},
 					{
 						repaymentId: 2,
 						repaymentStatus: 'unlogged',
 						dueDate: new Date(2019, 4, 19),
 						dateLogged: null,
 						repaymentDueAmount: 100000,
 						amountLogged: 0,
 						amountPosted: 0,
 						proofOfPayment: null
 					},
 					{
 						repaymentId: 3,
 						repaymentStatus: 'unlogged',
 						dueDate: new Date(2019, 5, 18),
 						dateLogged: null,
 						repaymentDueAmount: 100000,
 						amountLogged: 0,
 						amountPosted: 0,
 						proofOfPayment: null
 					}
 				]
 			}
 
 		]
 		
 	},
 	{
 		id: 1,
 		type: 'admin',
 		firstName: 'Oluwatobi',
 		lastName: 'Alaran',
 		dob: new Date(1900, 2, 2),
 		sex: 'male',
 		emailAddress: 'alarantobiloba@gmail.com',
 		phoneNumber: '08023417433',
 		idCard: "../resources/id.jpg",
 		profilePhoto: "../resources/profile-photo.jpg",
 		homeAddress: '202, Ikorodu Road, Onipanu. Lagos',
 		employmentStatus: 'employed',
 		employerOrBusinessName: 'Andela',
 		workAddress: '256, Ikorodu Road, Anthony. Lagos',
 		bvn: '12345678910',
 		bankName: 'Stanbic IBTC',
 		bankAccountNumber: '01987654321',
 	}
 ];


const countDownToNextRepayment = (loan) => {
	let today = new Date();
	let countDown = getNextDueRepayment(loan).dueDate - today;
	return countDown;
};

const getNextDueRepayment = (loan) => {
	for (let i = 0; i < loan.repayments.length; i++){
		if (loan.repayments[i].repaymentStatus != "posted"){
			return loan.repayments[i];
			break;
		}
	}
};

const getTotalDue = (loan) => {
	let due = loan.amount - amountOfRepaymentsPosted(loan);
};

const amountOfRepaymentsPosted = (loan) => {
	let amount = 0;
	for (let i = 0; i < loan.repayments.length; i++){
		if (loan.repayments[i].repaymentStatus == "posted" || "part posted"){
			amount += loan.repayments[i].amountPosted;
		}
	}
	return loan.amount - amount;
};

const numberOfRepaymentsPosted = (loan) => {
	let arry = 0;
	for (let i = 0; i < loan.repayments.length; i++){
		if (loan.repayments[i].repaymentStatus == "posted"){
			arry += 1;
		}
	}
	return arry;
};

const numberOfRepaymentsLeft = (loan) => {
	let val = loan.repayments.length - numberOfRepaymentsPosted(loan);
	return val;
};

const checkUserType = (usersArray, index) => {

	if (usersArray[index].type == "client"){
		return "client";
	} else {
		return "admin";
	}
};


export { users };
export { user };
export { countDownToNextRepayment, getNextDueRepayment, getTotalDue, amountOfRepaymentsPosted, numberOfRepaymentsPosted, numberOfRepaymentsLeft, checkUserType};
