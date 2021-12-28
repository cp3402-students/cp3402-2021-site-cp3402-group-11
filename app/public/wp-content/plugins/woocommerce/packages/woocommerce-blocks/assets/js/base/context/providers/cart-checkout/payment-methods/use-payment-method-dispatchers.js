"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaymentMethodDataDispatchers = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var actions_1 = require("./actions");
var constants_1 = require("./constants");
var customer_1 = require("../customer");
var shipping_1 = require("../shipping");
var usePaymentMethodDataDispatchers = function (dispatch) {
    var setBillingData = (0, customer_1.useCustomerDataContext)().setBillingData;
    var setShippingAddress = (0, shipping_1.useShippingDataContext)().setShippingAddress;
    var dispatchActions = (0, element_1.useMemo)(function () { return ({
        setRegisteredPaymentMethods: function (paymentMethods) {
            return void dispatch(actions_1.actions.setRegisteredPaymentMethods(paymentMethods));
        },
        setRegisteredExpressPaymentMethods: function (paymentMethods) {
            return void dispatch(actions_1.actions.setRegisteredExpressPaymentMethods(paymentMethods));
        },
        setShouldSavePayment: function (shouldSave) {
            return void dispatch(actions_1.actions.setShouldSavePaymentMethod(shouldSave));
        },
    }); }, [dispatch]);
    var setPaymentStatus = (0, element_1.useCallback)(function () { return ({
        pristine: function () { return dispatch(actions_1.actions.statusOnly(constants_1.STATUS.PRISTINE)); },
        started: function (paymentMethodData) {
            dispatch(actions_1.actions.started({
                paymentMethodData: paymentMethodData,
            }));
        },
        processing: function () {
            return dispatch(actions_1.actions.statusOnly(constants_1.STATUS.PROCESSING));
        },
        completed: function () { return dispatch(actions_1.actions.statusOnly(constants_1.STATUS.COMPLETE)); },
        error: function (errorMessage) {
            return dispatch(actions_1.actions.error(errorMessage));
        },
        failed: function (errorMessage, paymentMethodData, billingData) {
            if (billingData === void 0) { billingData = undefined; }
            if (billingData) {
                setBillingData(billingData);
            }
            dispatch(actions_1.actions.failed({
                errorMessage: errorMessage || '',
                paymentMethodData: paymentMethodData || {},
            }));
        },
        success: function (paymentMethodData, billingData, shippingData) {
            if (billingData === void 0) { billingData = undefined; }
            if (shippingData === void 0) { shippingData = undefined; }
            if (billingData) {
                setBillingData(billingData);
            }
            if (typeof shippingData !== undefined &&
                (shippingData === null || shippingData === void 0 ? void 0 : shippingData.address)) {
                setShippingAddress(shippingData.address);
            }
            dispatch(actions_1.actions.success({
                paymentMethodData: paymentMethodData,
            }));
        },
    }); }, [dispatch, setBillingData, setShippingAddress]);
    return {
        dispatchActions: dispatchActions,
        setPaymentStatus: setPaymentStatus,
    };
};
exports.usePaymentMethodDataDispatchers = usePaymentMethodDataDispatchers;
