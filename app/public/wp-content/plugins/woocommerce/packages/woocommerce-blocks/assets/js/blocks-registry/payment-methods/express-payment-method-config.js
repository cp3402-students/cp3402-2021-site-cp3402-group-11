"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
var payment_method_config_helper_1 = require("./payment-method-config-helper");
var assertions_1 = require("./assertions");
var ExpressPaymentMethodConfig = /** @class */ (function () {
    function ExpressPaymentMethodConfig(config) {
        var _a;
        // validate config
        ExpressPaymentMethodConfig.assertValidConfig(config);
        this.name = config.name;
        this.content = config.content;
        this.edit = config.edit;
        this.paymentMethodId = config.paymentMethodId || this.name;
        this.supports = {
            features: ((_a = config === null || config === void 0 ? void 0 : config.supports) === null || _a === void 0 ? void 0 : _a.features) || ['products'],
        };
        this.canMakePaymentFromConfig = config.canMakePayment;
    }
    Object.defineProperty(ExpressPaymentMethodConfig.prototype, "canMakePayment", {
        // canMakePayment is calculated each time based on data that modifies outside of the class (eg: cart data).
        get: function () {
            return (0, payment_method_config_helper_1.getCanMakePayment)(this.canMakePaymentFromConfig, this.supports.features, this.name);
        },
        enumerable: false,
        configurable: true
    });
    ExpressPaymentMethodConfig.assertValidConfig = function (config) {
        var _a, _b;
        (0, assertions_1.assertConfigHasProperties)(config, ['name', 'content', 'edit']);
        if (typeof config.name !== 'string') {
            throw new TypeError('The name property for the express payment method must be a string');
        }
        if (typeof config.paymentMethodId !== 'string' &&
            typeof config.paymentMethodId !== 'undefined') {
            throw new Error('The paymentMethodId property for the payment method must be a string or undefined (in which case it will be the value of the name property).');
        }
        if (typeof ((_a = config.supports) === null || _a === void 0 ? void 0 : _a.features) !== 'undefined' &&
            !Array.isArray((_b = config.supports) === null || _b === void 0 ? void 0 : _b.features)) {
            throw new Error('The features property for the payment method must be an array or undefined.');
        }
        (0, assertions_1.assertValidElement)(config.content, 'content');
        (0, assertions_1.assertValidElement)(config.edit, 'edit');
        if (typeof config.canMakePayment !== 'function') {
            throw new TypeError('The canMakePayment property for the express payment method must be a function.');
        }
    };
    return ExpressPaymentMethodConfig;
}());
exports.default = ExpressPaymentMethodConfig;
