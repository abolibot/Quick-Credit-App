const bcrypt = require('bcryptjs');

class User {
  constructor() {
    this.users = [
      {
        id: 1,
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@quickcredit.com',
        isAdmin: true,
        password: this.createPassword(1, 'pass4321'),
      },
    ];
    this.passwords = [];
  }

  createUser(data) {
    const newUser = {
      id: this.users.length + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
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
      createdOn: new Date().toLocaleString(),
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
