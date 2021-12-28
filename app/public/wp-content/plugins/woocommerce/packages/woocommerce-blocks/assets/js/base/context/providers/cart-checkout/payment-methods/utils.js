"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerPaymentMethods = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
/**
 * Gets the payment methods saved for the current user after filtering out disabled ones.
 */
var getCustomerPaymentMethods = function (availablePaymentMethods) {
    if (availablePaymentMethods === void 0) { availablePaymentMethods = {}; }
    if (Object.keys(availablePaymentMethods).length === 0) {
        return {};
    }
    var customerPaymentMethods = (0, settings_1.getSetting)('customerPaymentMethods', {});
    var paymentMethodKeys = Object.keys(customerPaymentMethods);
    var enabledCustomerPaymentMethods = {};
    paymentMethodKeys.forEach(function (type) {
        var methods = customerPaymentMethods[type].filter(function (_a) {
            var _b;
            var gateway = _a.method.gateway;
            return gateway in availablePaymentMethods &&
                ((_b = availablePaymentMethods[gateway].supports) === null || _b === void 0 ? void 0 : _b.showSavedCards);
        });
        if (methods.length) {
            enabledCustomerPaymentMethods[type] = methods;
        }
    });
    return enabledCustomerPaymentMethods;
};
exports.getCustomerPaymentMethods = getCustomerPaymentMethods;
