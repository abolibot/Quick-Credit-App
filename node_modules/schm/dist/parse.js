"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("./schema"));

var _mapValues = _interopRequireDefault(require("./mapValues"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parses a schema based on given values.
 * @example
 * const { parse } = require('schm')
 *
 * parse(
 *   { foo: 1, bar: '1' },
 *   { foo: String, bar: Number },
 * )
 * // -> { foo: '1', bar: 1 }
 *
 * // can also be used directly from schema
 * schema({ foo: String, bar: Number }).parse({ foo: 1, bar: '1' })
 */
var parse = function parse() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments.length > 1 ? arguments[1] : undefined;
  var schema = (0, _schema.default)(params);

  var transformValue = function transformValue(value, options, paramName, paramPath) {
    return Object.keys(options).reduce(function (finalValue, optionName) {
      var option = options[optionName];
      var parser = schema.parsers[optionName];

      if (typeof parser === "function") {
        return parser(finalValue, option, paramPath, options, values, schema);
      }

      if (parser) {
        throw new Error("[schm] ".concat(paramName, " parser must be a function"));
      }

      return finalValue;
    }, value);
  };

  return (0, _mapValues.default)(values, schema.params, transformValue);
};

var _default = parse;
exports.default = _default;