"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var hooks_1 = require("@woocommerce/base-context/hooks");
var getIconsFromPaymentMethods = function (paymentMethods) {
    return Object.values(paymentMethods).reduce(function (acc, paymentMethod) {
        if (paymentMethod.icons !== null) {
            acc = acc.concat(paymentMethod.icons);
        }
        return acc;
    }, []);
};
var Block = function (_a) {
    var className = _a.className;
    var paymentMethods = (0, hooks_1.usePaymentMethods)().paymentMethods;
    return (<cart_checkout_1.PaymentMethodIcons className={className} icons={getIconsFromPaymentMethods(paymentMethods)}/>);
};
exports.default = Block;
