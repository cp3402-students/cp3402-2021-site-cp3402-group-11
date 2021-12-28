"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertBlockComponent = exports.assertOption = exports.assertBlockParent = exports.assertBlockName = exports.assertType = void 0;
/**
 * External dependencies
 */
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
var get_registered_blocks_1 = require("./get-registered-blocks");
/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
var assertType = function (optionName, option, expectedType) {
    var actualType = typeof option;
    if (actualType !== expectedType) {
        throw new Error("Incorrect value for the " + optionName + " argument when registering a checkout block. It was a " + actualType + ", but must be a " + expectedType + ".");
    }
};
exports.assertType = assertType;
/**
 * Validate the block name.
 *
 * @throws Will throw an error if the block name is invalid.
 */
var assertBlockName = function (blockName) {
    (0, exports.assertType)('blockName', blockName, 'string');
    if (!blockName) {
        throw new Error("Value for the blockName argument must not be empty.");
    }
};
exports.assertBlockName = assertBlockName;
/**
 * Validate the block parent.
 *
 * @throws Will throw an error if the block name is invalid.
 */
var assertBlockParent = function (blockParent) {
    if (typeof blockParent !== 'string' && !Array.isArray(blockParent)) {
        throw new Error("Incorrect value for the parent argument when registering a checkout block. It was a " + typeof blockParent + ", but must be a string or array of strings.");
    }
    if (typeof blockParent === 'string' && !(0, get_registered_blocks_1.hasInnerBlocks)(blockParent)) {
        throw new Error("When registering a checkout block, the parent must be a valid inner block area.");
    }
    if (Array.isArray(blockParent) &&
        !blockParent.some(function (parent) { return (0, get_registered_blocks_1.hasInnerBlocks)(parent); })) {
        throw new Error("When registering a checkout block, the parent must be a valid inner block area.");
    }
};
exports.assertBlockParent = assertBlockParent;
/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 * @param {Object} options      Object containing the option to validate.
 * @param {string} optionName   Name of the option to validate.
 * @param {string} expectedType Type expected for the option.
 */
var assertOption = function (options, optionName, expectedType) {
    if (!(0, types_1.isObject)(options)) {
        return;
    }
    var actualType = typeof options[optionName];
    if (actualType !== expectedType) {
        throw new Error("Incorrect value for the " + optionName + " argument when registering a block component. It was a " + actualType + ", but must be a " + expectedType + ".");
    }
};
exports.assertOption = assertOption;
/**
 * Asserts that an option is a valid react element or lazy callback. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
var assertBlockComponent = function (options, optionName) {
    var optionValue = options[optionName];
    if (optionValue) {
        if (typeof optionValue === 'function') {
            return;
        }
        if ((0, types_1.isObject)(optionValue) &&
            optionValue.$$typeof &&
            optionValue.$$typeof === Symbol.for('react.lazy')) {
            return;
        }
    }
    throw new Error("Incorrect value for the " + optionName + " argument when registering a block component. Component must be a valid React Element or Lazy callback.");
};
exports.assertBlockComponent = assertBlockComponent;
