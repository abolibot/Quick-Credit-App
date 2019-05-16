"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schema = _interopRequireDefault(require("./schema"));

var _mapValues = _interopRequireDefault(require("./mapValues"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isPrimitive = function isPrimitive(arg) {
  return arg == null || _typeof(arg) !== "object" && typeof arg !== "function";
};

var replaceMessage = function replaceMessage(message, paramName, value, validatorName) {
  return message.replace(/\{(PARAM|PATH)\}/g, paramName).replace(/\{VALUE\}/g, value).replace(/\{(VALIDATOR|TYPE)\}/g, validatorName);
};

var createErrorObject = function createErrorObject(param, value, validator, optionValue, message) {
  return _objectSpread({
    param: param
  }, isPrimitive(value) ? {
    value: value
  } : {}, {
    validator: validator
  }, isPrimitive(optionValue) ? _defineProperty({}, validator, optionValue) : {}, message ? {
    message: replaceMessage(message, param, value, validator)
  } : {});
};
/**
 * Validates a schema based on given values.
 * @example
 * const schema = require('schm')
 * const { validate } = schema
 *
 * const userSchema = schema({
 *   name: {
 *     type: String,
 *     required: true,
 *   },
 *   age: {
 *     type: Number,
 *     min: [18, 'Too young'],
 *   }
 * })
 *
 * validate({ name: 'John', age: 17 }, userSchema)
 *   .then((parsedValues) => {
 *     console.log('Yaay!', parsedValues)
 *   })
 *   .catch((errors) => {
 *     console.log('Oops!', errors)
 *   })
 *
 * // Output:
 * // Oops! [{
 * //   param: 'age',
 * //   value: 17,
 * //   validator: 'min',
 * //   min: 18,
 * //   message: 'Too young',
 * // }]
 */


var validate = function validate() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments.length > 1 ? arguments[1] : undefined;
  var paramPathPrefix = arguments.length > 2 ? arguments[2] : undefined;
  var schema = (0, _schema.default)(params);
  var parsed = schema.parse(values);
  var promises = [];
  var errors = [];

  var transformValue = function transformValue(value, options, paramName, paramPath) {
    Object.keys(options).forEach(function (optionName) {
      var option = (0, _utils.parseValidatorOption)(options[optionName], optionName === "enum");
      var validator = schema.validators[optionName];

      if (typeof validator === "function") {
        var result = validator(value, option, paramPath, options, parsed, schema);
        var valid = result.valid,
            message = result.message,
            isSchema = result.isSchema;
        var args = [paramPath, value, optionName, option.optionValue, message];
        var errorObject = createErrorObject.apply(void 0, args);

        if (!valid) {
          errors.push(errorObject);
        } else if (typeof valid.catch === "function") {
          var promise = valid.catch(function (schemaErrors) {
            if (isSchema) {
              return errors.push.apply(errors, _toConsumableArray((0, _utils.toArray)(schemaErrors)));
            }

            return Promise.reject(errorObject);
          });
          promises.push(promise);
        }
      } else if (validator) {
        throw new Error("[schm] ".concat(paramName, " validator must be a function"));
      }
    });
  };

  (0, _mapValues.default)(parsed, schema.params, transformValue, (0, _utils.toArray)(paramPathPrefix));
  return Promise.all(promises).then(function () {
    if (errors.length) {
      return Promise.reject(errors);
    }

    return parsed;
  }, function (e) {
    var allErrors = [].concat(errors, (0, _utils.toArray)(e));
    return Promise.reject(allErrors);
  });
};

var _default = validate;
exports.default = _default;