"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

var _schema = require("./schema");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hasType = function hasType(options) {
  return (0, _utils.isObject)(options) && options.type;
};

var literalType = function literalType(options) {
  if ((0, _utils.isFunction)(options) || (0, _utils.isSchema)(options)) {
    return {
      type: options
    };
  }

  return options;
};

var defaultValue = function defaultValue(options) {
  if (!(0, _utils.isObject)(options) && !(0, _utils.isFunction)(options)) {
    return {
      type: options.constructor,
      default: options
    };
  }

  return options;
};

var nestedObject = function nestedObject(options) {
  if (!(0, _utils.isSchema)(options) && (0, _utils.isObject)(options) && !hasType(options)) {
    return {
      type: (0, _schema.defaultSchema)(options)
    };
  }

  return options;
};

var parseOptions = function parseOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : String;

  if ((0, _utils.isArray)(options)) {
    return {
      type: [parseOptions(options[0])]
    };
  }

  if (hasType(options) && (0, _utils.isArray)(options.type)) {
    return {
      type: [parseOptions(options.type[0])]
    };
  }

  var compose = function compose() {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return fns.reduce(function (f, g) {
      return function () {
        return f(g.apply(void 0, arguments));
      };
    });
  };

  var flow = compose(literalType, defaultValue, nestedObject);
  return flow(options);
};

var parseParams = function parseParams(params) {
  return Object.keys(params).reduce(function (finalParams, paramName) {
    return _objectSpread({}, finalParams, _defineProperty({}, paramName, parseOptions(params[paramName])));
  }, {});
};

var _default = parseParams;
exports.default = _default;