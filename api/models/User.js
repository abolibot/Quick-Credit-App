const randtoken = require('rand-token');
const bcrypt = require('bcryptjs');

class User {
  constructor() {
    this.users = [];
    this.passwords = [];
    this.date = new Date();
  }

  createUser(data) {
    const newUser = {
      id: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      token: randtoken.generate(16),
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
    this.createPassword(newUser.id, data.password);
    this.users.push(newUser);
    return newUser;
  }

  createPassword(id, plainPassword) {
    bcrypt.hash(plainPassword, 10, (err, hash) => {
      const newPassword = {
        userId: id,
        hashedPassword: hash,
      };
      this.passwords.push(newPassword);
      return newPassword;
    });
  }
}

module.exports = new User();
