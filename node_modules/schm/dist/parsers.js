"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.defaultParser = exports.trim = exports.uppercase = exports.lowercase = exports.get = exports.set = exports.type = void 0;

var _utils = require("./utils");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var type = function type(value, option) {
  if ((0, _utils.isArray)(option)) {
    return (0, _utils.toArray)(value).map(function (val) {
      return type(val, option[0]);
    });
  }

  if ((0, _utils.isSchema)(option)) {
    return option.parse(value);
  }

  if (value == null) {
    return value;
  }

  switch (option.name) {
    case "RegExp":
      return new RegExp(value, "i");

    case "Date":
      return new Date(/^\d{5,}$/.test(value) ? Number(value) : value);

    case "Boolean":
      return !(value === "false" || value === "0" || !value);

    case "Number":
      return Number(value);

    case "Object":
      return Object(value);

    case "String":
      return String(value);

    default:
      return value;
  }
};

exports.type = type;

var set = function set(value, option) {
  if (typeof option === "function") {
    return option(value);
  }

  throw new Error("[schm] `set` option must be a function");
};

exports.set = set;

var get = function get(value, option) {
  if (typeof option === "function") {
    return option(value);
  }

  throw new Error("[schm] `get` option must be a function");
};

exports.get = get;

var lowercase = function lowercase(value, option) {
  if (option && value) {
    if (typeof value.toLowerCase === "function") {
      return value.toLowerCase();
    }

    throw new Error("[schm] value must be a string to be lowercased. Instead, received ".concat(_typeof(value)));
  }

  return value;
};

exports.lowercase = lowercase;

var uppercase = function uppercase(value, option) {
  if (option && value) {
    if (typeof value.toUpperCase === "function") {
      return value.toUpperCase();
    }

    throw new Error("[schm] value must be a string to be uppercased. Instead, received ".concat(_typeof(value)));
  }

  return value;
};

exports.uppercase = uppercase;

var trim = function trim(value, option) {
  if (option && value) {
    if (typeof value.trim === "function") {
      return value.trim();
    }

    throw new Error("[schm] value must be a string to be trimmed. Instead, received ".concat(_typeof(value)));
  }

  return value;
};

exports.trim = trim;

var defaultParser = function defaultParser(value, option) {
  if (value == null || value === "" || Number.isNaN(value)) {
    return typeof option === "function" ? option() : option;
  }

  return value;
};

exports.defaultParser = defaultParser;
var _default = {
  type: type,
  set: set,
  get: get,
  lowercase: lowercase,
  uppercase: uppercase,
  trim: trim,
  default: defaultParser
};
exports.default = _default;