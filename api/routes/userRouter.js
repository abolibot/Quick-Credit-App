const express = require('express');
const User = require('../controllers/User');

const routes = () => {
  const userRouter = express.Router();
  userRouter.route('/')
    .get(User.verifyToken, User.getAllUsers);
  userRouter.route('/:id')
    .get(User.verifyToken, User.getAUser);
  userRouter.route('/:email/completeProfile')
    .patch(User.verifyToken, User.completeProfile);
  userRouter.route('/:email/verify')
    .patch(User.verifyToken, User.verifyUser);
  userRouter.route('/:email/unverify')
    .patch(User.verifyToken, User.unVerifyUser);
  userRouter.route('/:email/updateProfile')
    .patch(User.verifyToken, User.updateProfile);
  return userRouter;
};

module.exports = routes;
