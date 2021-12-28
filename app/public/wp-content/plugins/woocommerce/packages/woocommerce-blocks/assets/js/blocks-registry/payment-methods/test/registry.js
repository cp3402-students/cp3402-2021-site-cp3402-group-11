"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var blocks_registry_1 = require("@woocommerce/blocks-registry");
/**
 * Internal dependencies
 */
var extensions_config_1 = require("../extensions-config");
describe('registerPaymentMethodExtensionCallbacks', function () {
    it('Logs an error to console if namespace is already registered', function () {
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('woocommerce-marketplace-extension', {
            cod: function () { return false; },
        });
        // eslint-disable-next-line no-console
        expect(console).not.toHaveErrored();
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('woocommerce-marketplace-extension', {
            cod: function () { return false; },
        });
        expect(console).toHaveErrored();
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledTimes(1);
    });
    it('Does not overwrite a namespace if a second extensions tries to register with the same name', function () {
        var firstCodCallback = jest.fn().mockReturnValue(false);
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('overwrite-marketplace-extension', {
            cod: firstCodCallback,
        });
        // eslint-disable-next-line no-console
        expect(console).not.toHaveErrored();
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('overwrite-marketplace-extension', {
            cod: function () { return false; },
        });
        expect(extensions_config_1.canMakePaymentExtensionsCallbacks['overwrite-marketplace-extension'].cod).toEqual(firstCodCallback);
    });
    it('Logs an error if a supplied callback is not a function and does not register the callback for that method', function () {
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('other-woocommerce-marketplace-extension', {
            cod: false,
            cheque: function () { return true; },
        });
        // eslint-disable-next-line no-console
        expect(console).toHaveErrored();
        expect(extensions_config_1.canMakePaymentExtensionsCallbacks).toHaveProperty('other-woocommerce-marketplace-extension');
        expect(extensions_config_1.canMakePaymentExtensionsCallbacks['other-woocommerce-marketplace-extension']).not.toHaveProperty('cod');
        expect(extensions_config_1.canMakePaymentExtensionsCallbacks['other-woocommerce-marketplace-extension']).toHaveProperty('cheque');
    });
    it('Adds the namespace and callbacks to the canMakePaymentExtensionCallbacks object', function () {
        // We are using a new namespace here because canMakePaymentExtensionsCallbacks cannot be reset between tests.
        (0, blocks_registry_1.registerPaymentMethodExtensionCallbacks)('third-woocommerce-marketplace-extension', {
            cod: function () { return false; },
        });
        expect(extensions_config_1.canMakePaymentExtensionsCallbacks).toHaveProperty('third-woocommerce-marketplace-extension');
    });
});
