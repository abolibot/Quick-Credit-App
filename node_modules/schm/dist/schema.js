"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.group = exports.defaultSchema = void 0;

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _utils = require("./utils");

var _parsers = _interopRequireDefault(require("./parsers"));

var _validators = _interopRequireDefault(require("./validators"));

var _parse2 = _interopRequireDefault(require("./parse"));

var _validate2 = _interopRequireDefault(require("./validate"));

var _parseParams = _interopRequireDefault(require("./parseParams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultSchema = function defaultSchema() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    parsers: _parsers.default,
    validators: _validators.default,
    parse: function parse(values) {
      return (0, _parse2.default)(values, this);
    },
    validate: function validate(values, paramPathPrefix) {
      return (0, _validate2.default)(values, this, paramPathPrefix);
    },
    merge: function merge() {
      for (var _len = arguments.length, schemas = new Array(_len), _key = 0; _key < _len; _key++) {
        schemas[_key] = arguments[_key];
      }

      var merged = _merge2.default.apply(void 0, [{}, this].concat(schemas));

      return _objectSpread({}, merged, {
        params: (0, _parseParams.default)(merged.params)
      });
    },
    params: (0, _parseParams.default)(params)
  };
};
/**
 * A simple group of parameters. It's used internally when you pass literal
 * objects to [`schema`](#schema).
 * @example
 * const schema = require('schm')
 * const { group } = schema
 *
 * const userSchema = schema(
 *   group({
 *     id: String,
 *     name: String,
 *   }),
 *   group({
 *     age: Number,
 *   })
 * )
 */


exports.defaultSchema = defaultSchema;

var group = function group() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (previous) {
    return previous.merge(defaultSchema(params));
  };
};
/**
 * Creates a schema by composing groups of parameters.
 * @example
 * const schema = require('schm')
 *
 * const userSchema = schema({
 *   id: String,
 *   name: String,
 * }, {
 *   age: Number
 * })
 *
 * // nested schema
 * const teamSchema = schema({
 *   users: [userSchema],
 * })
 */


exports.group = group;

var schema = function schema() {
  for (var _len2 = arguments.length, groups = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    groups[_key2] = arguments[_key2];
  }

  return groups.reduce(function (finalSchema, currentGroup) {
    if (typeof currentGroup === "function") {
      return currentGroup(finalSchema);
    }

    if ((0, _utils.isSchema)(currentGroup)) {
      return finalSchema.merge(currentGroup);
    }

    return group(currentGroup)(finalSchema);
  }, defaultSchema());
};

var _default = schema;
exports.default = _default;