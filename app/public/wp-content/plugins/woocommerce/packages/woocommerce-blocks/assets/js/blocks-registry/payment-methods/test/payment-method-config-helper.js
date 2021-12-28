"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var blocks_registry_1 = require("@woocommerce/blocks-registry");
/**
 * Internal dependencies
 */
var helpers = require("../payment-method-config-helper");
var extensions_config_1 = require("../extensions-config");
var canMakePaymentArgument = {
    cartTotals: {
        total_items: '1488',
        total_items_tax: '312',
        total_fees: '0',
        total_fees_tax: '0',
        total_discount: '0',
        total_discount_tax: '0',
        total_shipping: '0',
        total_shipping_tax: '0',
        total_price: '1800',
        total_tax: '312',
        tax_lines: [
            {
                name: 'BTW',
                price: '312',
                rate: '21%',
            },
        ],
        currency_code: 'EUR',
        currency_symbol: '€',
        currency_minor_unit: 2,
        currency_decimal_separator: ',',
        currency_thousand_separator: '.',
        currency_prefix: '€',
        currency_suffix: '',
    },
    cartNeedsShipping: true,
    billingData: {
        first_name: 'name',
        last_name: 'Name',
        company: '',
        address_1: 'fdsfdsfdsf',
        address_2: '',
        city: 'Berlin',
        state: '',
        postcode: 'xxxxx',
        country: 'DE',
        email: 'name.Name@test.com',
        phone: '1234',
    },
    shippingAddress: {
        first_name: 'name',
        last_name: 'Name',
        company: '',
        address_1: 'fdsfdsfdsf',
        address_2: '',
        city: 'Berlin',
        state: '',
        postcode: 'xxxxx',
        country: 'DE',
        phone: '1234',
    },
    selectedShippingMethods: {
        '0': 'free_shipping:1',
    },
    paymentRequirements: ['products'],
};
describe('payment-method-config-helper', function () {
    var trueCallback = jest.fn().mockReturnValue(true);
    var falseCallback = jest.fn().mockReturnValue(false);
    var bacsCallback = jest.fn().mockReturnValue(false);
    var throwsCallback = jest.fn().mockImplementation(function () {
        throw new Error();
    });
    beforeAll(function () {
        // Register extension callbacks for two payment methods.
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('woocommerce-marketplace-extension', {
            // cod: one extension returns true, the other returns false.
            cod: trueCallback,
            // cheque: returns true only if arg.billingData.postcode is 12345.
            cheque: function (arg) { return arg.billingData.postcode === '12345'; },
            // bacs: both extensions return false.
            bacs: bacsCallback,
            // woopay: both extensions return true.
            woopay: trueCallback,
            // testpay: one callback errors, one returns true
            testpay: throwsCallback,
        });
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('other-woocommerce-marketplace-extension', {
            cod: falseCallback,
            woopay: trueCallback,
            testpay: trueCallback,
            bacs: bacsCallback,
        });
    });
    beforeEach(function () {
        trueCallback.mockClear();
        throwsCallback.mockClear();
        falseCallback.mockClear();
        bacsCallback.mockClear();
    });
    describe('getCanMakePayment', function () {
        it('returns callback canMakePaymentWithFeaturesCheck if no extension callback is detected', function () {
            // Define arguments from a payment method ('missing-payment-method') with no registered extension callbacks.
            var args = {
                canMakePayment: jest.fn().mockImplementation(function () { return true; }),
                features: ['products'],
                paymentMethodName: 'missing-payment-method',
            };
            var canMakePayment = helpers.getCanMakePayment(args.canMakePayment, args.features, args.paymentMethodName)(canMakePaymentArgument);
            // Expect that the result of getCanMakePayment is the result of
            // the payment method's own canMakePayment, as no extension callbacks are called.
            expect(canMakePayment).toEqual(args.canMakePayment());
        });
        it('returns callbacks from the extensions when they are defined', function () {
            // Define arguments from a payment method (bacs) with registered extension callbacks.
            var args = {
                canMakePaymentConfiguration: jest
                    .fn()
                    .mockImplementation(function () { return true; }),
                features: ['products'],
                paymentMethodName: 'bacs',
            };
            var canMakePayment = helpers.getCanMakePayment(args.canMakePaymentConfiguration, args.features, args.paymentMethodName)(canMakePaymentArgument);
            // Expect that the result of getCanMakePayment is not the result of
            // the payment method's own canMakePayment (args.canMakePaymentConfiguration),
            // but of the registered bacsCallback.
            expect(canMakePayment).toBe(bacsCallback());
        });
    });
    describe('canMakePaymentWithExtensions', function () {
        it("Returns false without executing the registered callbacks, if the payment method's canMakePayment callback returns false.", function () {
            var canMakePayment = function () { return false; };
            var canMakePaymentWithExtensionsResult = helpers.canMakePaymentWithExtensions(canMakePayment, extensions_config_1.canMakePaymentExtensionsCallbacks, 'cod')(canMakePaymentArgument);
            expect(canMakePaymentWithExtensionsResult).toBe(false);
            expect(trueCallback).not.toHaveBeenCalled();
        });
        it('Returns early when a registered callback returns false, without executing all the registered callbacks', function () {
            helpers.canMakePaymentWithExtensions(function () { return true; }, extensions_config_1.canMakePaymentExtensionsCallbacks, 'bacs')(canMakePaymentArgument);
            expect(bacsCallback).toHaveBeenCalledTimes(1);
        });
        it('Returns true if all extension callbacks return true', function () {
            var result = helpers.canMakePaymentWithExtensions(function () { return true; }, extensions_config_1.canMakePaymentExtensionsCallbacks, 'woopay')(canMakePaymentArgument);
            expect(result).toBe(true);
        });
        it('Passes canPayArg to the callback', function () {
            helpers.canMakePaymentWithExtensions(function () { return true; }, extensions_config_1.canMakePaymentExtensionsCallbacks, 'woopay')(canMakePaymentArgument);
            expect(trueCallback).toHaveBeenCalledWith(canMakePaymentArgument);
        });
        it('Allows all valid callbacks to run, even if one causes an error', function () {
            helpers.canMakePaymentWithExtensions(function () { return true; }, extensions_config_1.canMakePaymentExtensionsCallbacks, 'testpay')(canMakePaymentArgument);
            expect(console).toHaveErrored();
            expect(throwsCallback).toHaveBeenCalledTimes(1);
            expect(trueCallback).toHaveBeenCalledTimes(1);
        });
    });
});
