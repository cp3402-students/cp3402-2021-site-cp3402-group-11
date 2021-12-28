"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STATE = exports.DEFAULT_CHECKOUT_STATE_DATA = exports.STATUS = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
var STATUS;
(function (STATUS) {
    // Checkout is in it's initialized state.
    STATUS["PRISTINE"] = "pristine";
    // When checkout state has changed but there is no activity happening.
    STATUS["IDLE"] = "idle";
    // After BEFORE_PROCESSING status emitters have finished successfully. Payment processing is started on this checkout status.
    STATUS["PROCESSING"] = "processing";
    // After the AFTER_PROCESSING event emitters have completed. This status triggers the checkout redirect.
    STATUS["COMPLETE"] = "complete";
    // This is the state before checkout processing begins after the checkout button has been pressed/submitted.
    STATUS["BEFORE_PROCESSING"] = "before_processing";
    // After server side checkout processing is completed this status is set
    STATUS["AFTER_PROCESSING"] = "after_processing";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
var preloadedCheckoutData = (0, settings_1.getSetting)('checkoutData', {});
var checkoutData = __assign({ order_id: 0, customer_id: 0 }, (preloadedCheckoutData || {}));
exports.DEFAULT_CHECKOUT_STATE_DATA = {
    dispatchActions: {
        resetCheckout: function () { return void null; },
        setRedirectUrl: function (url) { return void url; },
        setHasError: function (hasError) { return void hasError; },
        setAfterProcessing: function (response) { return void response; },
        incrementCalculating: function () { return void null; },
        decrementCalculating: function () { return void null; },
        setCustomerId: function (id) { return void id; },
        setOrderId: function (id) { return void id; },
        setOrderNotes: function (orderNotes) { return void orderNotes; },
        setExtensionData: function (extensionData) { return void extensionData; },
    },
    onSubmit: function () { return void null; },
    isComplete: false,
    isIdle: false,
    isCalculating: false,
    isProcessing: false,
    isBeforeProcessing: false,
    isAfterProcessing: false,
    hasError: false,
    redirectUrl: '',
    orderId: 0,
    orderNotes: '',
    customerId: 0,
    onCheckoutAfterProcessingWithSuccess: function () { return function () { return void null; }; },
    onCheckoutAfterProcessingWithError: function () { return function () { return void null; }; },
    onCheckoutBeforeProcessing: function () { return function () { return void null; }; },
    onCheckoutValidationBeforeProcessing: function () { return function () { return void null; }; },
    hasOrder: false,
    isCart: false,
    shouldCreateAccount: false,
    setShouldCreateAccount: function (value) { return void value; },
    extensionData: {},
};
exports.DEFAULT_STATE = {
    redirectUrl: '',
    status: STATUS.PRISTINE,
    hasError: false,
    calculatingCount: 0,
    orderId: checkoutData.order_id,
    orderNotes: '',
    customerId: checkoutData.customer_id,
    shouldCreateAccount: false,
    processingResponse: null,
    extensionData: {},
};
