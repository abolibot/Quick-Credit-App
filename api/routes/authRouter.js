const express = require('express');
const User = require('../controllers/User');

const routes = () => {
  const authRouter = express.Router();
  authRouter.route('/signup')
    .post(User.signup);
  authRouter.route('/signin')
    .post(User.signin);
  return authRouter;
};

module.exports = routes;
