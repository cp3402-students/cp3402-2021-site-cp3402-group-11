"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentResultFromCheckoutResponse = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Prepares the payment_result data from the server checkout endpoint response.
 */
var getPaymentResultFromCheckoutResponse = function (response) {
    var paymentResult = {
        message: '',
        paymentStatus: '',
        redirectUrl: '',
        paymentDetails: {},
    };
    // payment_result is present in successful responses.
    if ('payment_result' in response) {
        paymentResult.paymentStatus = response.payment_result.payment_status;
        paymentResult.redirectUrl = response.payment_result.redirect_url;
        if (response.payment_result.hasOwnProperty('payment_details') &&
            Array.isArray(response.payment_result.payment_details)) {
            response.payment_result.payment_details.forEach(function (_a) {
                var key = _a.key, value = _a.value;
                paymentResult.paymentDetails[key] = (0, html_entities_1.decodeEntities)(value);
            });
        }
    }
    // message is present in error responses.
    if ('message' in response) {
        paymentResult.message = (0, html_entities_1.decodeEntities)(response.message);
    }
    // If there was an error code but no message, set a default message.
    if (!paymentResult.message &&
        'data' in response &&
        'status' in response.data &&
        response.data.status > 299) {
        paymentResult.message = (0, i18n_1.__)('Something went wrong. Please contact us to get assistance.', 'woo-gutenberg-products-block');
    }
    return paymentResult;
};
exports.getPaymentResultFromCheckoutResponse = getPaymentResultFromCheckoutResponse;
