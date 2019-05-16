const moment = require('moment');
const randtoken = require('rand-token');

class User {
  constructor() {
    this.users = [];
  }

  createUser(data) {
    const newUser = {
      id: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      token: randtoken.generate(16),
      password: data.password,
      sex: null,
      dob: null,
      validIdUrl: null,
      displayPictureUrl: null,
      phoneNumber: null,
      homeAddress: null,
      homeCity: null,
      homeState: null,
      employmentStatus: null,
      employerName: null,
      workAddress: null,
      workCity: null,
      workState: null,
      bvn: null,
      bank: null,
      accountNumber: null,
      isAdmin: false,
      status: 'pending verification',
      createdOn: moment().format('MMMM Do YYYY, h:mm a'),

    };
    this.users.push(newUser);
    return newUser;
  }
}

module.exports = new User();
