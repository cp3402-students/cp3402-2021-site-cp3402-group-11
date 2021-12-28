"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckoutBlockControlsContext = exports.useCheckoutBlockContext = exports.CheckoutBlockControlsContext = exports.CheckoutBlockContext = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
exports.CheckoutBlockContext = (0, element_1.createContext)({
    allowCreateAccount: false,
    showCompanyField: false,
    showApartmentField: false,
    showPhoneField: false,
    requireCompanyField: false,
    requirePhoneField: false,
    showOrderNotes: true,
    showPolicyLinks: true,
    showReturnToCart: true,
    cartPageId: 0,
    showRateAfterTaxName: false,
});
exports.CheckoutBlockControlsContext = (0, element_1.createContext)({
    addressFieldControls: function () { return null; },
    accountControls: function () { return null; },
});
var useCheckoutBlockContext = function () {
    return (0, element_1.useContext)(exports.CheckoutBlockContext);
};
exports.useCheckoutBlockContext = useCheckoutBlockContext;
var useCheckoutBlockControlsContext = function () {
    return (0, element_1.useContext)(exports.CheckoutBlockControlsContext);
};
exports.useCheckoutBlockControlsContext = useCheckoutBlockControlsContext;
