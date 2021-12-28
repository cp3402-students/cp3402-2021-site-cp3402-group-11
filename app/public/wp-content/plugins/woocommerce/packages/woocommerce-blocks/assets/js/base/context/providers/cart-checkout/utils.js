"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCheckoutResponseHeaders = exports.preparePaymentData = void 0;
/**
 * External dependencies
 */
var api_fetch_1 = require("@wordpress/api-fetch");
/**
 * Utility function for preparing payment data for the request.
 */
var preparePaymentData = function (
//Arbitrary payment data provided by the payment method.
paymentData, 
//Whether to save the payment method info to user account.
shouldSave, 
//The current active payment method.
activePaymentMethod) {
    var apiData = Object.keys(paymentData).map(function (property) {
        var value = paymentData[property];
        return { key: property, value: value };
    }, []);
    var savePaymentMethodKey = "wc-" + activePaymentMethod + "-new-payment-method";
    apiData.push({
        key: savePaymentMethodKey,
        value: shouldSave,
    });
    return apiData;
};
exports.preparePaymentData = preparePaymentData;
/**
 * Process headers from an API response an dispatch updates.
 */
var processCheckoutResponseHeaders = function (headers, dispatchActions) {
    if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- this does exist because it's monkey patched in
    // middleware/store-api-nonce.
    api_fetch_1.default.setNonce &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- this does exist because it's monkey patched in
        // middleware/store-api-nonce.
        typeof api_fetch_1.default.setNonce === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- this does exist because it's monkey patched in
        // middleware/store-api-nonce.
        api_fetch_1.default.setNonce(headers);
    }
    // Update user using headers.
    if (headers === null || headers === void 0 ? void 0 : headers.get('X-WC-Store-API-User')) {
        dispatchActions.setCustomerId(parseInt(headers.get('X-WC-Store-API-User') || '0', 10));
    }
};
exports.processCheckoutResponseHeaders = processCheckoutResponseHeaders;
