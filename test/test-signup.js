const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('signup', () => {
  it('should create a user and return the user on /api/v1/auth POST', (done) => {
    chai.request('http://localhost:4000')
      .post('/api/v1/auth/signup')
      .send({ 'email': 'unit-test@gmail.com', 'firstName': 'Oluwatobi', 'lastName': 'Alaran', 'password': 'password1' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('createdOn');
        res.body.status.should.equal(201);
        res.body.data.firstName.should.equal('Oluwatobi');
        res.body.data.lastName.should.equal('Alaran');
        res.body.data.email.should.equal('unit-test@gmail.com');
        done();
      });
  });

  it('should return error if email already exists on /api/v1/auth POST', (done) => {
    chai.request('http://localhost:4000')
      .post('/api/v1/auth/signup')
      .send({ 'email': 'unit-test@gmail.com', 'firstName': 'Oluwatobi', 'lastName': 'Alaran', 'password': 'password1' })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(409);
        res.body.error.should.equal('email address already exists, kindly enter a different email address');
        done();
      });
  });
});
