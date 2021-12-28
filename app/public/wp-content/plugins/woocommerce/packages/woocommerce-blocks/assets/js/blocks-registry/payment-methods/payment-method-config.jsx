"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var deprecated_1 = require("@wordpress/deprecated");
/**
 * Internal dependencies
 */
var payment_method_config_helper_1 = require("./payment-method-config-helper");
var assertions_1 = require("./assertions");
var NullComponent = function () {
    return null;
};
var PaymentMethodConfig = /** @class */ (function () {
    function PaymentMethodConfig(config) {
        var _a, _b, _c, _d;
        // validate config
        PaymentMethodConfig.assertValidConfig(config);
        this.name = config.name;
        this.label = config.label;
        this.placeOrderButtonLabel = config.placeOrderButtonLabel;
        this.ariaLabel = config.ariaLabel;
        this.content = config.content;
        this.savedTokenComponent = config.savedTokenComponent;
        this.icons = config.icons || null;
        this.edit = config.edit;
        this.paymentMethodId = config.paymentMethodId || this.name;
        this.supports = {
            showSavedCards: ((_a = config === null || config === void 0 ? void 0 : config.supports) === null || _a === void 0 ? void 0 : _a.showSavedCards) ||
                ((_b = config === null || config === void 0 ? void 0 : config.supports) === null || _b === void 0 ? void 0 : _b.savePaymentInfo) || // Kept for backward compatibility if methods still pass this when registering.
                false,
            showSaveOption: ((_c = config === null || config === void 0 ? void 0 : config.supports) === null || _c === void 0 ? void 0 : _c.showSaveOption) || false,
            features: ((_d = config === null || config === void 0 ? void 0 : config.supports) === null || _d === void 0 ? void 0 : _d.features) || ['products'],
        };
        this.canMakePaymentFromConfig = config.canMakePayment;
    }
    Object.defineProperty(PaymentMethodConfig.prototype, "canMakePayment", {
        // canMakePayment is calculated each time based on data that modifies outside of the class (eg: cart data).
        get: function () {
            return (0, payment_method_config_helper_1.getCanMakePayment)(this.canMakePaymentFromConfig, this.supports.features, this.name);
        },
        enumerable: false,
        configurable: true
    });
    PaymentMethodConfig.assertValidConfig = function (config) {
        var _a, _b, _c, _d, _e, _f, _g;
        // set default for optional
        config.savedTokenComponent = config.savedTokenComponent || (<NullComponent />);
        (0, assertions_1.assertConfigHasProperties)(config, [
            'name',
            'label',
            'ariaLabel',
            'content',
            'edit',
            'canMakePayment',
        ]);
        if (typeof config.name !== 'string') {
            throw new Error('The name property for the payment method must be a string');
        }
        if (typeof config.icons !== 'undefined' &&
            !Array.isArray(config.icons) &&
            config.icons !== null) {
            throw new Error('The icons property for the payment method must be an array or null.');
        }
        if (typeof config.paymentMethodId !== 'string' &&
            typeof config.paymentMethodId !== 'undefined') {
            throw new Error('The paymentMethodId property for the payment method must be a string or undefined (in which case it will be the value of the name property).');
        }
        if (typeof config.placeOrderButtonLabel !== 'string' &&
            typeof config.placeOrderButtonLabel !== 'undefined') {
            throw new TypeError('The placeOrderButtonLabel property for the payment method must be a string');
        }
        (0, assertions_1.assertValidElementOrString)(config.label, 'label');
        (0, assertions_1.assertValidElement)(config.content, 'content');
        (0, assertions_1.assertValidElement)(config.edit, 'edit');
        (0, assertions_1.assertValidElement)(config.savedTokenComponent, 'savedTokenComponent');
        if (typeof config.ariaLabel !== 'string') {
            throw new TypeError('The ariaLabel property for the payment method must be a string');
        }
        if (typeof config.canMakePayment !== 'function') {
            throw new TypeError('The canMakePayment property for the payment method must be a function.');
        }
        if (typeof ((_a = config.supports) === null || _a === void 0 ? void 0 : _a.showSavedCards) !== 'undefined' &&
            typeof ((_b = config.supports) === null || _b === void 0 ? void 0 : _b.showSavedCards) !== 'boolean') {
            throw new TypeError('If the payment method includes the `supports.showSavedCards` property, it must be a boolean');
        }
        if (typeof ((_c = config.supports) === null || _c === void 0 ? void 0 : _c.savePaymentInfo) !== 'undefined') {
            (0, deprecated_1.default)('Passing savePaymentInfo when registering a payment method.', {
                alternative: 'Pass showSavedCards and showSaveOption',
                plugin: 'woocommerce-gutenberg-products-block',
                link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3686',
            });
        }
        if (typeof ((_d = config.supports) === null || _d === void 0 ? void 0 : _d.features) !== 'undefined' &&
            !Array.isArray((_e = config.supports) === null || _e === void 0 ? void 0 : _e.features)) {
            throw new Error('The features property for the payment method must be an array or undefined.');
        }
        if (typeof ((_f = config.supports) === null || _f === void 0 ? void 0 : _f.showSaveOption) !== 'undefined' &&
            typeof ((_g = config.supports) === null || _g === void 0 ? void 0 : _g.showSaveOption) !== 'boolean') {
            throw new TypeError('If the payment method includes the `supports.showSaveOption` property, it must be a boolean');
        }
    };
    return PaymentMethodConfig;
}());
exports.default = PaymentMethodConfig;
