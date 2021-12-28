"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
/**
 * All the actions that can be dispatched for payment methods.
 */
exports.actions = {
    statusOnly: function (type) { return ({ type: type }); },
    error: function (errorMessage) {
        return ({
            type: constants_1.STATUS.ERROR,
            errorMessage: errorMessage,
        });
    },
    failed: function (_a) {
        var errorMessage = _a.errorMessage, paymentMethodData = _a.paymentMethodData;
        return ({
            type: constants_1.STATUS.FAILED,
            errorMessage: errorMessage,
            paymentMethodData: paymentMethodData,
        });
    },
    success: function (_a) {
        var paymentMethodData = _a.paymentMethodData;
        return ({
            type: constants_1.STATUS.SUCCESS,
            paymentMethodData: paymentMethodData,
        });
    },
    started: function (_a) {
        var paymentMethodData = _a.paymentMethodData;
        return ({
            type: constants_1.STATUS.STARTED,
            paymentMethodData: paymentMethodData,
        });
    },
    setRegisteredPaymentMethods: function (paymentMethods) {
        return ({
            type: constants_1.ACTION.SET_REGISTERED_PAYMENT_METHODS,
            paymentMethods: paymentMethods,
        });
    },
    setRegisteredExpressPaymentMethods: function (paymentMethods) {
        return ({
            type: constants_1.ACTION.SET_REGISTERED_EXPRESS_PAYMENT_METHODS,
            paymentMethods: paymentMethods,
        });
    },
    setShouldSavePaymentMethod: function (shouldSavePaymentMethod) {
        return ({
            type: constants_1.ACTION.SET_SHOULD_SAVE_PAYMENT_METHOD,
            shouldSavePaymentMethod: shouldSavePaymentMethod,
        });
    },
};
exports.default = exports.actions;
