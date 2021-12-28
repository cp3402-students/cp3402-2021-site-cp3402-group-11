"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.ACTION = void 0;
var ACTION;
(function (ACTION) {
    ACTION["SET_IDLE"] = "set_idle";
    ACTION["SET_PRISTINE"] = "set_pristine";
    ACTION["SET_REDIRECT_URL"] = "set_redirect_url";
    ACTION["SET_COMPLETE"] = "set_checkout_complete";
    ACTION["SET_BEFORE_PROCESSING"] = "set_before_processing";
    ACTION["SET_AFTER_PROCESSING"] = "set_after_processing";
    ACTION["SET_PROCESSING_RESPONSE"] = "set_processing_response";
    ACTION["SET_PROCESSING"] = "set_checkout_is_processing";
    ACTION["SET_HAS_ERROR"] = "set_checkout_has_error";
    ACTION["SET_NO_ERROR"] = "set_checkout_no_error";
    ACTION["SET_CUSTOMER_ID"] = "set_checkout_customer_id";
    ACTION["SET_ORDER_ID"] = "set_checkout_order_id";
    ACTION["SET_ORDER_NOTES"] = "set_checkout_order_notes";
    ACTION["INCREMENT_CALCULATING"] = "increment_calculating";
    ACTION["DECREMENT_CALCULATING"] = "decrement_calculating";
    ACTION["SET_SHOULD_CREATE_ACCOUNT"] = "set_should_create_account";
    ACTION["SET_EXTENSION_DATA"] = "set_extension_data";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
/**
 * All the actions that can be dispatched for the checkout.
 */
exports.actions = {
    setPristine: function () {
        return ({
            type: ACTION.SET_PRISTINE,
        });
    },
    setIdle: function () {
        return ({
            type: ACTION.SET_IDLE,
        });
    },
    setProcessing: function () {
        return ({
            type: ACTION.SET_PROCESSING,
        });
    },
    setRedirectUrl: function (redirectUrl) {
        return ({
            type: ACTION.SET_REDIRECT_URL,
            redirectUrl: redirectUrl,
        });
    },
    setProcessingResponse: function (data) {
        return ({
            type: ACTION.SET_PROCESSING_RESPONSE,
            data: data,
        });
    },
    setComplete: function (data) {
        if (data === void 0) { data = {}; }
        return ({
            type: ACTION.SET_COMPLETE,
            data: data,
        });
    },
    setBeforeProcessing: function () {
        return ({
            type: ACTION.SET_BEFORE_PROCESSING,
        });
    },
    setAfterProcessing: function () {
        return ({
            type: ACTION.SET_AFTER_PROCESSING,
        });
    },
    setHasError: function (hasError) {
        if (hasError === void 0) { hasError = true; }
        return ({
            type: hasError ? ACTION.SET_HAS_ERROR : ACTION.SET_NO_ERROR,
        });
    },
    incrementCalculating: function () {
        return ({
            type: ACTION.INCREMENT_CALCULATING,
        });
    },
    decrementCalculating: function () {
        return ({
            type: ACTION.DECREMENT_CALCULATING,
        });
    },
    setCustomerId: function (customerId) {
        return ({
            type: ACTION.SET_CUSTOMER_ID,
            customerId: customerId,
        });
    },
    setOrderId: function (orderId) {
        return ({
            type: ACTION.SET_ORDER_ID,
            orderId: orderId,
        });
    },
    setShouldCreateAccount: function (shouldCreateAccount) {
        return ({
            type: ACTION.SET_SHOULD_CREATE_ACCOUNT,
            shouldCreateAccount: shouldCreateAccount,
        });
    },
    setOrderNotes: function (orderNotes) {
        return ({
            type: ACTION.SET_ORDER_NOTES,
            orderNotes: orderNotes,
        });
    },
    setExtensionData: function (extensionData) {
        return ({
            type: ACTION.SET_EXTENSION_DATA,
            extensionData: extensionData,
        });
    },
};
