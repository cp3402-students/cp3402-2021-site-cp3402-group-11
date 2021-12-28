"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mustContain = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
/**
 * Ensures that a given value contains a string, or throws an error.
 */
var mustContain = function (value, requiredValue) {
    if (!value.includes(requiredValue)) {
        throw Error((0, i18n_1.sprintf)(
        /* translators: %1$s value passed to filter, %2$s : value that must be included. */
        (0, i18n_1.__)('Returned value must include %1$s, you passed "%2$s"', 'woo-gutenberg-products-block'), value, requiredValue));
    }
    return true;
};
exports.mustContain = mustContain;
