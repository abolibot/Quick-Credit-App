const express = require('express');
const User = require('../controllers/User');
const { validateBody, schemas } = require('../validator');

const routes = () => {
  const authRouter = express.Router();
  authRouter.route('/signup')
    .post(validateBody(schemas.signUpSchema), User.signup);
  authRouter.route('/signin')
    .post(validateBody(schemas.signInSchema), User.signin);
  return authRouter;
};

module.exports = routes;
