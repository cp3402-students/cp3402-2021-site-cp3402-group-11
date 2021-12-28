"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.objectHasProp = exports.isObject = exports.isString = exports.isNumber = exports.isNull = void 0;
var isNull = function (term) {
    return term === null;
};
exports.isNull = isNull;
var isNumber = function (term) {
    return typeof term === 'number';
};
exports.isNumber = isNumber;
var isString = function (term) {
    return typeof term === 'string';
};
exports.isString = isString;
var isObject = function (term) {
    return (!(0, exports.isNull)(term) &&
        term instanceof Object &&
        term.constructor === Object);
};
exports.isObject = isObject;
function objectHasProp(target, property) {
    // The `in` operator throws a `TypeError` for non-object values.
    return (0, exports.isObject)(target) && property in target;
}
exports.objectHasProp = objectHasProp;
// eslint-disable-next-line @typescript-eslint/ban-types
var isFunction = function (term) {
    return typeof term === 'function';
};
exports.isFunction = isFunction;
