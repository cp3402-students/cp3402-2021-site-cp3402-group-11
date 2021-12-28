"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCanMakePayment = exports.canMakePaymentWithExtensions = exports.canMakePaymentWithFeaturesCheck = void 0;
/**
 * Internal dependencies
 */
var extensions_config_1 = require("./extensions-config");
// Filter out payment methods by supported features and cart requirement.
var canMakePaymentWithFeaturesCheck = function (canMakePayment, features) { return function (canPayArgument) {
    var requirements = (canPayArgument === null || canPayArgument === void 0 ? void 0 : canPayArgument.paymentRequirements) || [];
    var featuresSupportRequirements = requirements.every(function (requirement) {
        return features.includes(requirement);
    });
    return featuresSupportRequirements && canMakePayment(canPayArgument);
}; };
exports.canMakePaymentWithFeaturesCheck = canMakePaymentWithFeaturesCheck;
// Filter out payment methods by callbacks registered by extensions.
var canMakePaymentWithExtensions = function (canMakePayment, extensionsCallbacks, paymentMethodName) { return function (canPayArgument) {
    // Validate whether the payment method is available based on its own criteria first.
    var canPay = canMakePayment(canPayArgument);
    if (canPay) {
        // Gather all callbacks for paymentMethodName.
        var namespacedCallbacks_1 = {};
        Object.entries(extensionsCallbacks).forEach(function (_a) {
            var namespace = _a[0], callbacks = _a[1];
            namespacedCallbacks_1[namespace] =
                callbacks[paymentMethodName];
        });
        canPay = Object.keys(namespacedCallbacks_1).every(function (namespace) {
            try {
                return namespacedCallbacks_1[namespace](canPayArgument);
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.error("Error when executing callback for " + paymentMethodName + " in " + namespace, err);
                // .every() expects a return value at the end of every arrow function and
                // this ensures that the error is ignored when computing the whole result.
                return true;
            }
        });
    }
    return canPay;
}; };
exports.canMakePaymentWithExtensions = canMakePaymentWithExtensions;
var getCanMakePayment = function (canMakePayment, features, paymentMethodName) {
    var canPay = (0, exports.canMakePaymentWithFeaturesCheck)(canMakePayment, features);
    // Loop through all callbacks to check if there are any registered for this payment method.
    return Object.values(extensions_config_1.extensionsConfig.canMakePayment).some(function (callbacks) { return paymentMethodName in callbacks; })
        ? (0, exports.canMakePaymentWithExtensions)(canPay, extensions_config_1.extensionsConfig.canMakePayment, paymentMethodName)
        : canPay;
};
exports.getCanMakePayment = getCanMakePayment;
