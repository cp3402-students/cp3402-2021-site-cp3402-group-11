"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpressPaymentMethods = exports.getPaymentMethods = exports.__experimentalDeRegisterExpressPaymentMethod = exports.__experimentalDeRegisterPaymentMethod = exports.registerPaymentMethodExtensionCallbacks = exports.registerExpressPaymentMethod = exports.registerPaymentMethod = void 0;
/**
 * External dependencies
 */
var deprecated_1 = require("@wordpress/deprecated");
/**
 * Internal dependencies
 */
var payment_method_config_1 = require("./payment-method-config");
var express_payment_method_config_1 = require("./express-payment-method-config");
var extensions_config_1 = require("./extensions-config");
var paymentMethods = {};
var expressPaymentMethods = {};
/**
 * Register a regular payment method.
 */
var registerPaymentMethod = function (options) {
    var paymentMethodConfig;
    if (typeof options === 'function') {
        // Legacy fallback for previous API, where client passes a function:
        // registerPaymentMethod( ( Config ) => new Config( options ) );
        paymentMethodConfig = options(payment_method_config_1.default);
        (0, deprecated_1.default)('Passing a callback to registerPaymentMethod()', {
            alternative: 'a config options object',
            plugin: 'woocommerce-gutenberg-products-block',
            link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3404',
        });
    }
    else {
        paymentMethodConfig = new payment_method_config_1.default(options);
    }
    if (paymentMethodConfig instanceof payment_method_config_1.default) {
        paymentMethods[paymentMethodConfig.name] = paymentMethodConfig;
    }
};
exports.registerPaymentMethod = registerPaymentMethod;
/**
 * Register an express payment method.
 */
var registerExpressPaymentMethod = function (options) {
    var paymentMethodConfig;
    if (typeof options === 'function') {
        // Legacy fallback for previous API, where client passes a function:
        // registerExpressPaymentMethod( ( Config ) => new Config( options ) );
        paymentMethodConfig = options(express_payment_method_config_1.default);
        (0, deprecated_1.default)('Passing a callback to registerExpressPaymentMethod()', {
            alternative: 'a config options object',
            plugin: 'woocommerce-gutenberg-products-block',
            link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3404',
        });
    }
    else {
        paymentMethodConfig = new express_payment_method_config_1.default(options);
    }
    if (paymentMethodConfig instanceof express_payment_method_config_1.default) {
        expressPaymentMethods[paymentMethodConfig.name] = paymentMethodConfig;
    }
};
exports.registerExpressPaymentMethod = registerExpressPaymentMethod;
/**
 * Allows extension to register callbacks for specific payment methods to determine if they can make payments
 */
var registerPaymentMethodExtensionCallbacks = function (namespace, callbacks) {
    if (extensions_config_1.canMakePaymentExtensionsCallbacks[namespace]) {
        // eslint-disable-next-line no-console
        console.error("The namespace provided to registerPaymentMethodExtensionCallbacks must be unique. Callbacks have already been registered for the " + namespace + " namespace.");
    }
    else {
        // Set namespace up as an empty object.
        extensions_config_1.canMakePaymentExtensionsCallbacks[namespace] = {};
        Object.entries(callbacks).forEach(function (_a) {
            var paymentMethodName = _a[0], callback = _a[1];
            if (typeof callback === 'function') {
                extensions_config_1.canMakePaymentExtensionsCallbacks[namespace][paymentMethodName] = callback;
            }
            else {
                // eslint-disable-next-line no-console
                console.error("All callbacks provided to registerPaymentMethodExtensionCallbacks must be functions. The callback for the " + paymentMethodName + " payment method in the " + namespace + " namespace was not a function.");
            }
        });
    }
};
exports.registerPaymentMethodExtensionCallbacks = registerPaymentMethodExtensionCallbacks;
var __experimentalDeRegisterPaymentMethod = function (paymentMethodName) {
    delete paymentMethods[paymentMethodName];
};
exports.__experimentalDeRegisterPaymentMethod = __experimentalDeRegisterPaymentMethod;
var __experimentalDeRegisterExpressPaymentMethod = function (paymentMethodName) {
    delete expressPaymentMethods[paymentMethodName];
};
exports.__experimentalDeRegisterExpressPaymentMethod = __experimentalDeRegisterExpressPaymentMethod;
var getPaymentMethods = function () {
    return paymentMethods;
};
exports.getPaymentMethods = getPaymentMethods;
var getExpressPaymentMethods = function () {
    return expressPaymentMethods;
};
exports.getExpressPaymentMethods = getExpressPaymentMethods;
