"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
exports.default = {
    showRateAfterTaxName: {
        type: 'boolean',
        default: (0, settings_1.getSetting)('displayCartPricesIncludingTax', false),
    },
    className: {
        type: 'string',
        default: '',
    },
    lock: {
        type: 'object',
        default: {
            move: true,
            remove: true,
        },
    },
};
