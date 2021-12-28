"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PAYMENT_METHOD_DATA = exports.DEFAULT_PAYMENT_DATA_CONTEXT_STATE = exports.ACTION = exports.STATUS = void 0;
var STATUS;
(function (STATUS) {
    STATUS["PRISTINE"] = "pristine";
    STATUS["STARTED"] = "started";
    STATUS["PROCESSING"] = "processing";
    STATUS["ERROR"] = "has_error";
    STATUS["FAILED"] = "failed";
    STATUS["SUCCESS"] = "success";
    STATUS["COMPLETE"] = "complete";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
var ACTION;
(function (ACTION) {
    ACTION["SET_REGISTERED_PAYMENT_METHODS"] = "set_registered_payment_methods";
    ACTION["SET_REGISTERED_EXPRESS_PAYMENT_METHODS"] = "set_registered_express_payment_methods";
    ACTION["SET_SHOULD_SAVE_PAYMENT_METHOD"] = "set_should_save_payment_method";
})(ACTION = exports.ACTION || (exports.ACTION = {}));
// Note - if fields are added/shape is changed, you may want to update PRISTINE reducer clause to preserve your new field.
exports.DEFAULT_PAYMENT_DATA_CONTEXT_STATE = {
    currentStatus: STATUS.PRISTINE,
    shouldSavePaymentMethod: false,
    paymentMethodData: {
        payment_method: '',
    },
    hasSavedToken: false,
    errorMessage: '',
    paymentMethods: {},
    expressPaymentMethods: {},
};
exports.DEFAULT_PAYMENT_METHOD_DATA = {
    setPaymentStatus: function () { return ({
        pristine: function () { return void null; },
        started: function () { return void null; },
        processing: function () { return void null; },
        completed: function () { return void null; },
        error: function (errorMessage) { return void errorMessage; },
        failed: function (errorMessage, paymentMethodData) {
            return void [errorMessage, paymentMethodData];
        },
        success: function (paymentMethodData, billingData) {
            return void [paymentMethodData, billingData];
        },
    }); },
    currentStatus: {
        isPristine: true,
        isStarted: false,
        isProcessing: false,
        isFinished: false,
        hasError: false,
        hasFailed: false,
        isSuccessful: false,
        isDoingExpressPayment: false,
    },
    paymentStatuses: STATUS,
    paymentMethodData: {},
    errorMessage: '',
    activePaymentMethod: '',
    setActivePaymentMethod: function () { return void null; },
    activeSavedToken: '',
    setActiveSavedToken: function () { return void null; },
    customerPaymentMethods: {},
    paymentMethods: {},
    expressPaymentMethods: {},
    paymentMethodsInitialized: false,
    expressPaymentMethodsInitialized: false,
    onPaymentProcessing: function () { return function () { return function () { return void null; }; }; },
    setExpressPaymentError: function () { return void null; },
    isExpressPaymentMethodActive: false,
    setShouldSavePayment: function () { return void null; },
    shouldSavePayment: false,
};
