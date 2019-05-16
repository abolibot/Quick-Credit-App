"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var mapValues = function mapValues(values, params, transformValueFn) {
  var paramNames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return Object.keys(params).reduce(function (finalParams, paramName) {
    var options = params[paramName];
    var value = values[paramName];

    var paramPath = _toConsumableArray(paramNames).concat([paramName]).join(".");

    var mergeParam = function mergeParam(finalValue) {
      return _objectSpread({}, finalParams, _defineProperty({}, paramName, finalValue));
    };

    if ((0, _utils.isArray)(options.type)) {
      var _options$type = _slicedToArray(options.type, 1),
          opt = _options$type[0];

      var finalValue = (0, _utils.toArray)(value).map(function (val, i) {
        return transformValueFn(val, opt, paramName, [paramPath, i].join("."));
      });
      return mergeParam(finalValue);
    }

    if ((0, _utils.isSchema)(options.type)) {
      return mergeParam(mapValues(value, options.type.params, transformValueFn, [paramPath]));
    }

    return mergeParam(transformValueFn(value, options, paramName, paramPath));
  }, {});
};

var _default = mapValues;
exports.default = _default;