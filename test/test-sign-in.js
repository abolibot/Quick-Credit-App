const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

describe('signin', () => {
  it('should create a user and return the user on /api/v1/auth POST', (done) => {
    chai.request('http://localhost:4000')
      .post('/api/v1/auth/signin')
      .send({ 'email': 'alarantobiloba@gmail.com', 'password': 'password1' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.should.have.property('status');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        res.body.status.should.equal(200);
        res.body.data.email.should.equal('alarantobiloba@gmail.com');
        res.body.data.password.should.equal('password1');
        done();
      }); 
  });

  it('should return error if email does not exists on /api/v1/auth POST', (done) => {
    chai.request('http://localhost:4000')
      .post('/api/v1/auth/signin')
      .send({ 'email': 'alarantobiloba@gmail.com', 'password': 'password1' })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('invalid login details');
        done();
      });
  });

  it('should return error if password does not match on /api/v1/auth POST', (done) => {
    chai.request('http://localhost:4000')
      .post('/api/v1/auth/signin')
      .send({ 'email': 'alarantobiloba@gmail.com', 'password': 'password1' })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.equal(401);
        res.body.error.should.equal('invalid login details');
        done();
      });
  });
});
