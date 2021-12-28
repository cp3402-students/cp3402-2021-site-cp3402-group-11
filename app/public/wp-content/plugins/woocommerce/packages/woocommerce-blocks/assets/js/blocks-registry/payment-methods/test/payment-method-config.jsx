"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var blocks_registry_1 = require("@woocommerce/blocks-registry");
/**
 * Internal dependencies
 */
var payment_method_config_1 = require("../payment-method-config");
var paymentMethodConfigHelpers = require("../payment-method-config-helper");
describe('PaymentMethodConfig', function () {
    var paymentMethod;
    var extensionsCallbackSpy = jest.spyOn(paymentMethodConfigHelpers, 'canMakePaymentWithExtensions');
    beforeEach(function () {
        paymentMethod = new payment_method_config_1.default({
            name: 'test-payment-method',
            label: 'Test payment method',
            ariaLabel: 'Test payment method',
            content: <div>Test payment content</div>,
            edit: <div>Test payment edit</div>,
            canMakePayment: function () { return true; },
            supports: { features: ['products'] },
        });
    });
    it('Uses canMakePaymentWithExtensions as the canMakePayment function if an extension registers a callback', function () {
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('woocommerce-marketplace-extension', {
            'unrelated-payment-method': function () { return true; },
        });
        // At this point, since no extensions have registered a callback for
        // test-payment-method we can expect the canMakePayment getter NOT
        // to execute canMakePaymentWithExtensions.
        // Disable no-unused-expressions because we just want to test the getter
        // eslint-disable-next-line no-unused-expressions
        paymentMethod.canMakePayment;
        expect(extensionsCallbackSpy).toHaveBeenCalledTimes(0);
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('other-woocommerce-marketplace-extension', {
            'test-payment-method': function () { return true; },
        });
        // Now, because an extension _has_ registered a callback for test-payment-method
        // The getter will use canMakePaymentWithExtensions to create the
        // canMakePayment function.
        // Disable no-unused-expressions because we just want to test the getter
        // eslint-disable-next-line no-unused-expressions
        paymentMethod.canMakePayment;
        expect(extensionsCallbackSpy).toHaveBeenCalledTimes(1);
    });
});
