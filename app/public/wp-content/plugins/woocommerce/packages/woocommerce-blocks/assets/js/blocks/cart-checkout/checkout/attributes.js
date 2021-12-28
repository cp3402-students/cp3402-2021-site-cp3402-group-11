"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockAttributes = exports.blockName = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
exports.blockName = 'woocommerce/checkout';
exports.blockAttributes = {
    isPreview: {
        type: 'boolean',
        default: false,
        save: false,
    },
    hasDarkControls: {
        type: 'boolean',
        default: (0, settings_1.getSetting)('hasDarkEditorStyleSupport', false),
    },
    showCompanyField: {
        type: 'boolean',
        default: false,
    },
    requireCompanyField: {
        type: 'boolean',
        default: false,
    },
    allowCreateAccount: {
        type: 'boolean',
        default: false,
    },
    showApartmentField: {
        type: 'boolean',
        default: true,
    },
    showPhoneField: {
        type: 'boolean',
        default: true,
    },
    requirePhoneField: {
        type: 'boolean',
        default: false,
    },
    // Deprecated - here for v1 migration support
    showOrderNotes: {
        type: 'boolean',
        default: true,
    },
    showPolicyLinks: {
        type: 'boolean',
        default: true,
    },
    showReturnToCart: {
        type: 'boolean',
        default: true,
    },
    cartPageId: {
        type: 'number',
        default: 0,
    },
    showRateAfterTaxName: {
        type: 'boolean',
        default: (0, settings_1.getSetting)('displayCartPricesIncludingTax', false),
    },
};
