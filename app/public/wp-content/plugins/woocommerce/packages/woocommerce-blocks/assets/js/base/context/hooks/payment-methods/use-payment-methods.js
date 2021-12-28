"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpressPaymentMethods = exports.usePaymentMethods = void 0;
/**
 * External dependencies
 */
var base_hooks_1 = require("@woocommerce/base-hooks");
/**
 * Internal dependencies
 */
var payment_methods_1 = require("../../providers/cart-checkout/payment-methods");
var usePaymentMethodState = function (express) {
    if (express === void 0) { express = false; }
    var _a = (0, payment_methods_1.usePaymentMethodDataContext)(), paymentMethods = _a.paymentMethods, expressPaymentMethods = _a.expressPaymentMethods, paymentMethodsInitialized = _a.paymentMethodsInitialized, expressPaymentMethodsInitialized = _a.expressPaymentMethodsInitialized;
    var currentPaymentMethods = (0, base_hooks_1.useShallowEqual)(paymentMethods);
    var currentExpressPaymentMethods = (0, base_hooks_1.useShallowEqual)(expressPaymentMethods);
    return {
        paymentMethods: express
            ? currentExpressPaymentMethods
            : currentPaymentMethods,
        isInitialized: express
            ? expressPaymentMethodsInitialized
            : paymentMethodsInitialized,
    };
};
var usePaymentMethods = function () { return usePaymentMethodState(false); };
exports.usePaymentMethods = usePaymentMethods;
var useExpressPaymentMethods = function () {
    return usePaymentMethodState(true);
};
exports.useExpressPaymentMethods = useExpressPaymentMethods;
