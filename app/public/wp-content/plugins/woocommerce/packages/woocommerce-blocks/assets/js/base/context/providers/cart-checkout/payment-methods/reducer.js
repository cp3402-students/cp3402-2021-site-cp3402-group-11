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
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
var hasSavedPaymentToken = function (paymentMethodData) {
    return !!(typeof paymentMethodData === 'object' && paymentMethodData.isSavedToken);
};
/**
 * Reducer for payment data state
 */
var reducer = function (state, _a) {
    if (state === void 0) { state = constants_1.DEFAULT_PAYMENT_DATA_CONTEXT_STATE; }
    var type = _a.type, paymentMethodData = _a.paymentMethodData, _b = _a.shouldSavePaymentMethod, shouldSavePaymentMethod = _b === void 0 ? false : _b, _c = _a.errorMessage, errorMessage = _c === void 0 ? '' : _c, _d = _a.paymentMethods, paymentMethods = _d === void 0 ? {} : _d;
    switch (type) {
        case constants_1.STATUS.STARTED:
            return __assign(__assign({}, state), { currentStatus: constants_1.STATUS.STARTED, paymentMethodData: paymentMethodData || state.paymentMethodData, hasSavedToken: hasSavedPaymentToken(paymentMethodData || state.paymentMethodData) });
        case constants_1.STATUS.ERROR:
            return state.currentStatus !== constants_1.STATUS.ERROR
                ? __assign(__assign({}, state), { currentStatus: constants_1.STATUS.ERROR, errorMessage: errorMessage || state.errorMessage }) : state;
        case constants_1.STATUS.FAILED:
            return state.currentStatus !== constants_1.STATUS.FAILED
                ? __assign(__assign({}, state), { currentStatus: constants_1.STATUS.FAILED, paymentMethodData: paymentMethodData || state.paymentMethodData, errorMessage: errorMessage || state.errorMessage }) : state;
        case constants_1.STATUS.SUCCESS:
            return state.currentStatus !== constants_1.STATUS.SUCCESS
                ? __assign(__assign({}, state), { currentStatus: constants_1.STATUS.SUCCESS, paymentMethodData: paymentMethodData || state.paymentMethodData, hasSavedToken: hasSavedPaymentToken(paymentMethodData || state.paymentMethodData) }) : state;
        case constants_1.STATUS.PROCESSING:
            return state.currentStatus !== constants_1.STATUS.PROCESSING
                ? __assign(__assign({}, state), { currentStatus: constants_1.STATUS.PROCESSING, errorMessage: '' }) : state;
        case constants_1.STATUS.COMPLETE:
            return state.currentStatus !== constants_1.STATUS.COMPLETE
                ? __assign(__assign({}, state), { currentStatus: constants_1.STATUS.COMPLETE }) : state;
        case constants_1.STATUS.PRISTINE:
            return __assign(__assign({}, constants_1.DEFAULT_PAYMENT_DATA_CONTEXT_STATE), { currentStatus: constants_1.STATUS.PRISTINE, 
                // keep payment method registration state
                paymentMethods: __assign({}, state.paymentMethods), expressPaymentMethods: __assign({}, state.expressPaymentMethods), shouldSavePaymentMethod: state.shouldSavePaymentMethod });
        case constants_1.ACTION.SET_REGISTERED_PAYMENT_METHODS:
            return __assign(__assign({}, state), { paymentMethods: paymentMethods });
        case constants_1.ACTION.SET_REGISTERED_EXPRESS_PAYMENT_METHODS:
            return __assign(__assign({}, state), { expressPaymentMethods: paymentMethods });
        case constants_1.ACTION.SET_SHOULD_SAVE_PAYMENT_METHOD:
            return __assign(__assign({}, state), { shouldSavePaymentMethod: shouldSavePaymentMethod });
    }
};
exports.default = reducer;
