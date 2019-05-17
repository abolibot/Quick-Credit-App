const express = require('express');
const User = require('../controllers/User');

const routes = () => {
  const userRouter = express.Router();
  userRouter.route('/')
    .get(User.getAllUsers);
  userRouter.route('/:id')
    .get(User.getAUser);
  userRouter.route('/:email/completeProfile')
    .patch(User.completeProfile);
  userRouter.route('/:email/verify')
    .patch(User.verifyUser);
  return userRouter;
};

module.exports = routes;
