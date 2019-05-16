"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.minlength = exports.maxlength = exports.min = exports.max = exports.enumValidator = exports.match = exports.required = exports.type = exports.validate = void 0;

var _utils = require("./utils");

var validate = function validate(value, option, paramPath, options, values, schema) {
  var optionValue = option.optionValue,
      message = option.message;

  if ((0, _utils.isArray)(optionValue)) {
    return optionValue.reduce(function (response, currentOption) {
      return !response.valid ? response : validate(value, (0, _utils.parseValidatorOption)(currentOption), paramPath, options, values, schema);
    }, {
      valid: true
    });
  }

  if (typeof optionValue !== "function") {
    throw new Error("[schm] validate must be a function");
  }

  return {
    valid: optionValue(value, paramPath, options, values, schema),
    message: message
  };
};

exports.validate = validate;

var type = function type(value, option, paramPath) {
  var optionValue = option.optionValue;

  if ((0, _utils.isSchema)(optionValue)) {
    return {
      valid: optionValue.validate(value, paramPath),
      isSchema: true
    };
  }

  return {
    valid: true
  };
};

exports.type = type;

var required = function required(value, option) {
  var optionValue = option.optionValue,
      message = option.message;
  var valid = optionValue ? value != null && value !== "" && !Number.isNaN(value) : true;
  return {
    valid: valid,
    message: message || "{PARAM} is required"
  };
};

exports.required = required;

var match = function match(value, option) {
  var optionValue = option.optionValue,
      message = option.message;

  if (!(optionValue instanceof RegExp)) {
    throw new Error("[schm] match must be a regex");
  }

  return {
    valid: !value || optionValue.test(value),
    message: message || "{PARAM} does not match"
  };
};

exports.match = match;

var enumValidator = function enumValidator(value, option) {
  var optionValue = option.optionValue,
      message = option.message;

  if (!(0, _utils.isArray)(optionValue)) {
    throw new Error("[schm] enum must be an array");
  }

  return {
    valid: optionValue.indexOf(value) >= 0,
    message: message || "{PARAM} must be one of the following: ".concat(optionValue.join(", "))
  };
};

exports.enumValidator = enumValidator;

var max = function max(value, option) {
  var optionValue = option.optionValue,
      message = option.message;
  return {
    valid: typeof value === "undefined" || value <= optionValue,
    message: message || "{PARAM} must be lower than or equal ".concat(optionValue)
  };
};

exports.max = max;

var min = function min(value, option) {
  var optionValue = option.optionValue,
      message = option.message;
  return {
    valid: typeof value === "undefined" || value >= optionValue,
    message: message || "{PARAM} must be greater than or equal ".concat(optionValue)
  };
};

exports.min = min;

var maxlength = function maxlength(value, option) {
  var optionValue = option.optionValue,
      message = option.message;
  return {
    valid: typeof value === "undefined" || value.length <= optionValue,
    message: message || "{PARAM} length must be lower than or equal ".concat(optionValue)
  };
};

exports.maxlength = maxlength;

var minlength = function minlength(value, option) {
  var optionValue = option.optionValue,
      message = option.message;
  return {
    valid: typeof value === "undefined" || value.length >= optionValue,
    message: message || "{PARAM} length must be greater than or equal ".concat(optionValue)
  };
};

exports.minlength = minlength;
var _default = {
  type: type,
  required: required,
  match: match,
  enum: enumValidator,
  max: max,
  min: min,
  maxlength: maxlength,
  minlength: minlength,
  validate: validate
};
exports.default = _default;