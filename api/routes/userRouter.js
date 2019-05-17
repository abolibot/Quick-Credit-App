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
  userRouter.route('/:email/unverify')
    .patch(User.unVerifyUser);
  userRouter.route('/:email/updateProfile')
    .patch(User.updateProfile);
  return userRouter;
};

module.exports = routes;
