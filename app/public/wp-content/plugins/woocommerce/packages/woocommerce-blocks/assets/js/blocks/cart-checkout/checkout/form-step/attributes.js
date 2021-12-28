"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var attributes = function (_a) {
    var _b = _a.defaultTitle, defaultTitle = _b === void 0 ? (0, i18n_1.__)('Step', 'woo-gutenberg-products-block') : _b, _c = _a.defaultDescription, defaultDescription = _c === void 0 ? (0, i18n_1.__)('Step description text.', 'woo-gutenberg-products-block') : _c, _d = _a.defaultShowStepNumber, defaultShowStepNumber = _d === void 0 ? true : _d;
    return ({
        title: {
            type: 'string',
            default: defaultTitle,
        },
        description: {
            type: 'string',
            default: defaultDescription,
        },
        showStepNumber: {
            type: 'boolean',
            default: defaultShowStepNumber,
        },
    });
};
exports.default = attributes;
