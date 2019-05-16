"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseValidatorOption = exports.isObject = exports.isFunction = exports.isSchema = exports.isArray = exports.toArray = void 0;

var _omit = _interopRequireDefault(require("lodash/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var toArray = function toArray(value) {
  return [].concat(typeof value === "undefined" ? [] : value);
};

exports.toArray = toArray;

var isArray = function isArray(value) {
  return Array.isArray(value);
};

exports.isArray = isArray;

var isSchema = function isSchema(schema) {
  return !!(schema && schema.params && schema.parsers && schema.validators && schema.parse && schema.validate && schema.merge);
};

exports.isSchema = isSchema;

var isFunction = function isFunction(value) {
  return typeof value === "function";
};

exports.isFunction = isFunction;

var isObject = function isObject(value) {
  return _typeof(value) === "object";
};

exports.isObject = isObject;

var parseValidatorOption = function parseValidatorOption(option, ignoreArray) {
  var isArrayAndHasMessage = function isArrayAndHasMessage(v) {
    return isArray(v) && v.length === 2 && typeof v[1] === "string";
  };

  var isValidatorObject = function isValidatorObject(v) {
    return v && (v.message || v.msg);
  };

  if (!ignoreArray && isArrayAndHasMessage(option)) {
    return {
      optionValue: option[0],
      message: option[1]
    };
  }

  if (isValidatorObject(option)) {
    var optionWithoutMessage = (0, _omit.default)(option, "message", "msg");
    var optionValueKey = Object.keys(optionWithoutMessage)[0];
    return {
      optionValue: optionWithoutMessage[optionValueKey],
      message: option.message || option.msg
    };
  }

  return {
    optionValue: option
  };
};

exports.parseValidatorOption = parseValidatorOption;