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
      status: Joi.string().equal('approved', 'rejected'),
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
      status: Joi.string().equal('pending'),
    }),
    completeProfileSchema: Joi.object().keys({
      sex: Joi.string().equal('male', 'female').required(),
      dob: Joi.date().min('1919-12-31').max('2000-12-31').iso().required(),
      validIdUrl: Joi.string().max(100).required(),
      displayPictureUrl: Joi.string().required(),
      phoneNumber: Joi.string().min(11).max(11).regex(/^[0]{1}[7,8,9]{1}[0,1]{1}[0-9]{8}$/).required(),
      homeAddress: Joi.string().max(100).required(),
      homeCity: Joi.string().max(20).required(),
      homeState: Joi.string().equal('abia', 'adamawa', 'akwaIbom', 'anambra', 'bauchi', 'bayelsa', 'benue', 'bornu', 'crossRiver', 'delta', 'ebonyi', 'enugu', 'edo', 'ekiti', 'gombe', 'imo', 'jigawa', 'kaduna', 'katsina', 'kano', 'kebbi', 'kogi', 'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct').required(),
      employmentStatus: Joi.string().equal('employed', 'unemployed').required(),
      employerName: Joi.string().max(50),
      workAddress: Joi.string().max(100).required(),
      workCity: Joi.string().max(20).required(),
      workState: Joi.string().equal('abia', 'adamawa', 'akwaIbom', 'anambra', 'bauchi', 'bayelsa', 'benue', 'bornu', 'crossRiver', 'delta', 'ebonyi', 'enugu', 'edo', 'ekiti', 'gombe', 'imo', 'jigawa', 'kaduna', 'katsina', 'kano', 'kebbi', 'kogi', 'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct').required(),
      bvn: Joi.string().min(11).max(11).required(),
      bank: Joi.string().equal('access', 'citi', 'eco', 'fidelity', 'fcmb', 'first', 'gtb', 'heritage', 'jaiz', 'keystone', 'polaris', 'providus', 'stanbic', 'standardChartered', 'sterling', 'SunTrust', 'union', 'uba', 'unity', 'wema', 'zenith').required(),
      accountNumber: Joi.string().min(10).max(10).required(),
    }).and('employerName', 'workAddress', 'workState'),
    updateProfileSchema: Joi.object().keys({
      sex: Joi.string().equal('male', 'female'),
      dob: Joi.date().min('1919-12-31').max('2000-12-31').iso(),
      validIdUrl: Joi.string().max(100),
      displayPictureUrl: Joi.string(),
      phoneNumber: Joi.string().min(11).max(11).regex(/^[0]{1}[7,8,9]{1}[0,1]{1}[0-9]{8}$/),
      homeAddress: Joi.string().max(100),
      homeCity: Joi.string().max(20),
      homeState: Joi.string().equal('abia', 'adamawa', 'akwaIbom', 'anambra', 'bauchi', 'bayelsa', 'benue', 'bornu', 'crossRiver', 'delta', 'ebonyi', 'enugu', 'edo', 'ekiti', 'gombe', 'imo', 'jigawa', 'kaduna', 'katsina', 'kano', 'kebbi', 'kogi', 'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct'),
      employmentStatus: Joi.string().equal('employed', 'unemployed'),
      employerName: Joi.string().max(50),
      workAddress: Joi.string().max(100),
      workCity: Joi.string().max(20),
      workState: Joi.string().equal('abia', 'adamawa', 'akwaIbom', 'anambra', 'bauchi', 'bayelsa', 'benue', 'bornu', 'crossRiver', 'delta', 'ebonyi', 'enugu', 'edo', 'ekiti', 'gombe', 'imo', 'jigawa', 'kaduna', 'katsina', 'kano', 'kebbi', 'kogi', 'kwara', 'lagos', 'nasarawa', 'niger', 'ogun', 'ondo', 'osun', 'oyo', 'plateau', 'rivers', 'sokoto', 'taraba', 'yobe', 'zamfara', 'fct'),
      bvn: Joi.string().min(11).max(11),
      bank: Joi.string().equal('access', 'citi', 'eco', 'fidelity', 'fcmb', 'first', 'gtb', 'heritage', 'jaiz', 'keystone', 'polaris', 'providus', 'stanbic', 'standardChartered', 'sterling', 'SunTrust', 'union', 'uba', 'unity', 'wema', 'zenith'),
      accountNumber: Joi.string().min(10).max(10),
    }).and('employerName', 'workAddress', 'workState'),
    approveLoanSchema: Joi.object().keys({
      status: Joi.string().equal('approved', 'rejected'),
    }),
  },
};
