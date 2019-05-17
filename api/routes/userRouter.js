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
  return userRouter;
};

module.exports = routes;
