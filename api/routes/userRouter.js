const express = require('express');
const User = require('../controllers/User');
const {
  validateBody,
  validateIdParam,
  validateQuery,
  schemas,
} = require('../validator');

const routes = () => {
  const userRouter = express.Router();
  userRouter.route('/')
    .get(validateQuery(schemas.userByStatusSchema), User.verifyToken, User.getAllUsers);
  userRouter.route('/:email')
    .get(validateIdParam(schemas.userEmailParamSchema), User.verifyToken, User.getAUser);
  userRouter.route('/:email/completeProfile')
    .patch(validateIdParam(schemas.userEmailParamSchema), validateBody(schemas.completeProfileSchema), User.verifyToken, User.completeProfile);
  userRouter.route('/:email/verify')
    .patch(validateIdParam(schemas.userEmailParamSchema), User.verifyToken, User.verifyUser);
  userRouter.route('/:email/unverify')
    .patch(validateIdParam(schemas.userEmailParamSchema), User.verifyToken, User.unVerifyUser);
  userRouter.route('/:email/updateProfile')
    .patch(validateIdParam(schemas.userEmailParamSchema), validateBody(schemas.updateProfileSchema), User.verifyToken, User.updateProfile);
  return userRouter;
};

module.exports = routes;
