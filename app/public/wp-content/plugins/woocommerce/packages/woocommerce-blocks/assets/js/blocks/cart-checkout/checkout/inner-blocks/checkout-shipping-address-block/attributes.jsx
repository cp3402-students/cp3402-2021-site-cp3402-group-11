"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
var attributes_1 = require("../../form-step/attributes");
exports.default = __assign(__assign({}, (0, attributes_1.default)({
    defaultTitle: (0, i18n_1.__)('Shipping address', 'woo-gutenberg-products-block'),
    defaultDescription: (0, i18n_1.__)('Enter the address where you want your order delivered.', 'woo-gutenberg-products-block'),
})), { className: {
        type: 'string',
        default: '',
    }, lock: {
        type: 'object',
        default: {
            move: true,
            remove: true,
        },
    } });
