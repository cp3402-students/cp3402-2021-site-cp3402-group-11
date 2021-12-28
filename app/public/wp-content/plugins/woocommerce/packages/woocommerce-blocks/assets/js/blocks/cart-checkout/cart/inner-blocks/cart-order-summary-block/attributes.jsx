"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
exports.default = {
    isShippingCalculatorEnabled: {
        type: 'boolean',
        default: (0, settings_1.getSetting)('isShippingCalculatorEnabled', true),
    },
    showRateAfterTaxName: {
        type: 'boolean',
        default: (0, settings_1.getSetting)('displayCartPricesIncludingTax', false),
    },
    lock: {
        type: 'object',
        default: {
            move: true,
            remove: true,
        },
    },
};
