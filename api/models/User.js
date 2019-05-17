const randtoken = require('rand-token');

class User {
  constructor() {
    this.users = [];
    this.date = new Date();
  }

  createUser(data) {
    const newUser = {
      id: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
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
      createdOn: this.date.toUTCString(),

    };
    this.users.push(newUser);
    return newUser;
  }
}

module.exports = new User();
