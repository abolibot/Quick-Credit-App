const Joi = require('@hapi/joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json({ status: 400, error: result.error.details[0].message });
      }
      if (!req.value) {
        req.value = {};
      }
      req.value.body = result.value;
      next();
    };
  },

  validateIdParam: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.params, schema);
      if (result.error) {
        return res.status(400).json({ status: 400, error: result.error.details[0].message });
      }
      if (!req.value) {
        req.value = {};
      }
      req.value.params = result.value;
      next();
    };
  },

  validateQuery: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.query, schema);
      if (result.error) {
        return res.status(400).json({ status: 400, error: result.error.details[0].message });
      }
      if (!req.value) {
        req.value = {};
      }
      req.value.query = result.value;
      next();
    };
  },

  schemas: {
    signUpSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
      lastName: Joi.string().regex(/^([a-zA-Z]{2,30}[-]{0,1}[a-zA-Z]{2,30})$/).max(20).required(),
      password: Joi.string().min(6).required(),
    }),
    signInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
    loanIdParamSchema: Joi.object().keys({
      loanId: Joi.number().integer().min(1),
      id: Joi.number().integer().min(1),
    }),
    createLoanSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      tenor: Joi.number().integer().min(1).max(12).required(),
      amount: Joi.number().integer().min(5000).max(100000).required(),
    }),
    loanByCategorySchema: Joi.object().keys({
      status: Joi.string().equal('approved', 'rejected').max(20),
      repaid: Joi.boolean(),
      email: Joi.string().email(),
    }),
    userEmailParamSchema: Joi.object().keys({
      email: Joi.string().email(),
    }),
    userIdParamSchema: Joi.object().keys({
      id: Joi.number().integer().min(1),
    }),
    userByStatusSchema: Joi.object().keys({
      status: Joi.string().equal('pending').max(20),
    }),
    completeProfileSchema: Joi.object().keys({
      
    }),
    updateProfileSchema: Joi.object().keys({
      
    }),
    approveLoanSchema: Joi.object().keys({
      
    }),
    RejectLoanSchema: Joi.object().keys({
      
    }),
  },
};
