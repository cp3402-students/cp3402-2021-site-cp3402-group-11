"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodDataProvider = exports.usePaymentMethodDataContext = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var constants_1 = require("./constants");
var reducer_1 = require("./reducer");
var use_payment_method_registration_1 = require("./use-payment-method-registration");
var use_payment_method_dispatchers_1 = require("./use-payment-method-dispatchers");
var use_active_payment_method_1 = require("./use-active-payment-method");
var checkout_state_1 = require("../checkout-state");
var editor_context_1 = require("../../editor-context");
var event_emit_1 = require("./event-emit");
var validation_1 = require("../../validation");
var use_store_notices_1 = require("../../../hooks/use-store-notices");
var use_emit_response_1 = require("../../../hooks/use-emit-response");
var utils_1 = require("./utils");
var PaymentMethodDataContext = (0, element_1.createContext)(constants_1.DEFAULT_PAYMENT_METHOD_DATA);
var usePaymentMethodDataContext = function () {
    return (0, element_1.useContext)(PaymentMethodDataContext);
};
exports.usePaymentMethodDataContext = usePaymentMethodDataContext;
/**
 * PaymentMethodDataProvider is automatically included in the CheckoutDataProvider.
 *
 * This provides the api interface (via the context hook) for payment method status and data.
 *
 * @param {Object} props          Incoming props for provider
 * @param {Object} props.children The wrapped components in this provider.
 */
var PaymentMethodDataProvider = function (_a) {
    var children = _a.children;
    var _b = (0, checkout_state_1.useCheckoutContext)(), checkoutIsProcessing = _b.isProcessing, checkoutIsIdle = _b.isIdle, checkoutIsCalculating = _b.isCalculating, checkoutHasError = _b.hasError;
    var _c = (0, editor_context_1.useEditorContext)(), isEditor = _c.isEditor, getPreviewData = _c.getPreviewData;
    var setValidationErrors = (0, validation_1.useValidationContext)().setValidationErrors;
    var _d = (0, use_store_notices_1.useStoreNotices)(), addErrorNotice = _d.addErrorNotice, removeNotice = _d.removeNotice;
    var _e = (0, use_emit_response_1.useEmitResponse)(), isSuccessResponse = _e.isSuccessResponse, isErrorResponse = _e.isErrorResponse, isFailResponse = _e.isFailResponse, noticeContexts = _e.noticeContexts;
    var _f = (0, element_1.useReducer)(event_emit_1.reducer, {}), observers = _f[0], observerDispatch = _f[1];
    var onPaymentProcessing = (0, event_emit_1.useEventEmitters)(observerDispatch).onPaymentProcessing;
    var currentObservers = (0, element_1.useRef)(observers);
    // ensure observers are always current.
    (0, element_1.useEffect)(function () {
        currentObservers.current = observers;
    }, [observers]);
    var _g = (0, element_1.useReducer)(reducer_1.default, constants_1.DEFAULT_PAYMENT_DATA_CONTEXT_STATE), paymentData = _g[0], dispatch = _g[1];
    var _h = (0, use_payment_method_dispatchers_1.usePaymentMethodDataDispatchers)(dispatch), dispatchActions = _h.dispatchActions, setPaymentStatus = _h.setPaymentStatus;
    var paymentMethodsInitialized = (0, use_payment_method_registration_1.usePaymentMethods)(dispatchActions.setRegisteredPaymentMethods);
    var expressPaymentMethodsInitialized = (0, use_payment_method_registration_1.useExpressPaymentMethods)(dispatchActions.setRegisteredExpressPaymentMethods);
    var _j = (0, use_active_payment_method_1.useActivePaymentMethod)(), activePaymentMethod = _j.activePaymentMethod, activeSavedToken = _j.activeSavedToken, setActivePaymentMethod = _j.setActivePaymentMethod, setActiveSavedToken = _j.setActiveSavedToken;
    var customerPaymentMethods = (0, element_1.useMemo)(function () {
        if (isEditor) {
            return getPreviewData('previewSavedPaymentMethods');
        }
        return paymentMethodsInitialized
            ? (0, utils_1.getCustomerPaymentMethods)(paymentData.paymentMethods)
            : {};
    }, [
        isEditor,
        getPreviewData,
        paymentMethodsInitialized,
        paymentData.paymentMethods,
    ]);
    var setExpressPaymentError = (0, element_1.useCallback)(function (message) {
        if (message) {
            addErrorNotice(message, {
                id: 'wc-express-payment-error',
                context: noticeContexts.EXPRESS_PAYMENTS,
            });
        }
        else {
            removeNotice('wc-express-payment-error', noticeContexts.EXPRESS_PAYMENTS);
        }
    }, [addErrorNotice, noticeContexts.EXPRESS_PAYMENTS, removeNotice]);
    var isExpressPaymentMethodActive = Object.keys(paymentData.expressPaymentMethods).includes(activePaymentMethod);
    var currentStatus = (0, element_1.useMemo)(function () { return ({
        isPristine: paymentData.currentStatus === constants_1.STATUS.PRISTINE,
        isStarted: paymentData.currentStatus === constants_1.STATUS.STARTED,
        isProcessing: paymentData.currentStatus === constants_1.STATUS.PROCESSING,
        isFinished: [
            constants_1.STATUS.ERROR,
            constants_1.STATUS.FAILED,
            constants_1.STATUS.SUCCESS,
        ].includes(paymentData.currentStatus),
        hasError: paymentData.currentStatus === constants_1.STATUS.ERROR,
        hasFailed: paymentData.currentStatus === constants_1.STATUS.FAILED,
        isSuccessful: paymentData.currentStatus === constants_1.STATUS.SUCCESS,
        isDoingExpressPayment: paymentData.currentStatus !== constants_1.STATUS.PRISTINE &&
            isExpressPaymentMethodActive,
    }); }, [paymentData.currentStatus, isExpressPaymentMethodActive]);
    // Update the active (selected) payment method when it is empty, or invalid.
    (0, element_1.useEffect)(function () {
        var paymentMethodKeys = Object.keys(paymentData.paymentMethods);
        var allPaymentMethodKeys = __spreadArray(__spreadArray([], paymentMethodKeys, true), Object.keys(paymentData.expressPaymentMethods), true);
        if (!paymentMethodsInitialized || !paymentMethodKeys.length) {
            return;
        }
        setActivePaymentMethod(function (currentActivePaymentMethod) {
            // If there's no active payment method, or the active payment method has
            // been removed (e.g. COD vs shipping methods), set one as active.
            // Note: It's possible that the active payment method might be an
            // express payment method. So registered express payment methods are
            // included in the check here.
            if (!currentActivePaymentMethod ||
                !allPaymentMethodKeys.includes(currentActivePaymentMethod)) {
                setPaymentStatus().pristine();
                return Object.keys(paymentData.paymentMethods)[0];
            }
            return currentActivePaymentMethod;
        });
    }, [
        paymentMethodsInitialized,
        paymentData.paymentMethods,
        paymentData.expressPaymentMethods,
        setActivePaymentMethod,
        setPaymentStatus,
    ]);
    // flip payment to processing if checkout processing is complete, there are no errors, and payment status is started.
    (0, element_1.useEffect)(function () {
        if (checkoutIsProcessing &&
            !checkoutHasError &&
            !checkoutIsCalculating &&
            !currentStatus.isFinished) {
            setPaymentStatus().processing();
        }
    }, [
        checkoutIsProcessing,
        checkoutHasError,
        checkoutIsCalculating,
        currentStatus.isFinished,
        setPaymentStatus,
    ]);
    // When checkout is returned to idle, set payment status to pristine but only if payment status is already not finished.
    (0, element_1.useEffect)(function () {
        if (checkoutIsIdle && !currentStatus.isSuccessful) {
            setPaymentStatus().pristine();
        }
    }, [checkoutIsIdle, currentStatus.isSuccessful, setPaymentStatus]);
    // if checkout has an error and payment is not being made with a saved token and payment status is success, then let's sync payment status back to pristine.
    (0, element_1.useEffect)(function () {
        if (checkoutHasError &&
            currentStatus.isSuccessful &&
            !paymentData.hasSavedToken) {
            setPaymentStatus().pristine();
        }
    }, [
        checkoutHasError,
        currentStatus.isSuccessful,
        paymentData.hasSavedToken,
        setPaymentStatus,
    ]);
    (0, element_1.useEffect)(function () {
        // Note: the nature of this event emitter is that it will bail on any
        // observer that returns a response that !== true. However, this still
        // allows for other observers that return true for continuing through
        // to the next observer (or bailing if there's a problem).
        if (currentStatus.isProcessing) {
            removeNotice('wc-payment-error', noticeContexts.PAYMENTS);
            (0, event_emit_1.emitEventWithAbort)(currentObservers.current, event_emit_1.EMIT_TYPES.PAYMENT_PROCESSING, {}).then(function (observerResponses) {
                var _a, _b, _c, _d, _e;
                var successResponse, errorResponse;
                observerResponses.forEach(function (response) {
                    if (isSuccessResponse(response)) {
                        // the last observer response always "wins" for success.
                        successResponse = response;
                    }
                    if (isErrorResponse(response) ||
                        isFailResponse(response)) {
                        errorResponse = response;
                    }
                });
                if (successResponse && !errorResponse) {
                    setPaymentStatus().success((_a = successResponse === null || successResponse === void 0 ? void 0 : successResponse.meta) === null || _a === void 0 ? void 0 : _a.paymentMethodData, (_b = successResponse === null || successResponse === void 0 ? void 0 : successResponse.meta) === null || _b === void 0 ? void 0 : _b.billingData, (_c = successResponse === null || successResponse === void 0 ? void 0 : successResponse.meta) === null || _c === void 0 ? void 0 : _c.shippingData);
                }
                else if (errorResponse && isFailResponse(errorResponse)) {
                    if (errorResponse.message &&
                        errorResponse.message.length) {
                        addErrorNotice(errorResponse.message, {
                            id: 'wc-payment-error',
                            isDismissible: false,
                            context: (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.messageContext) ||
                                noticeContexts.PAYMENTS,
                        });
                    }
                    setPaymentStatus().failed(errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.message, (_d = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.meta) === null || _d === void 0 ? void 0 : _d.paymentMethodData, (_e = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.meta) === null || _e === void 0 ? void 0 : _e.billingData);
                }
                else if (errorResponse) {
                    if (errorResponse.message &&
                        errorResponse.message.length) {
                        addErrorNotice(errorResponse.message, {
                            id: 'wc-payment-error',
                            isDismissible: false,
                            context: (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.messageContext) ||
                                noticeContexts.PAYMENTS,
                        });
                    }
                    setPaymentStatus().error(errorResponse.message);
                    setValidationErrors(errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.validationErrors);
                }
                else {
                    // otherwise there are no payment methods doing anything so
                    // just consider success
                    setPaymentStatus().success();
                }
            });
        }
    }, [
        currentStatus.isProcessing,
        setValidationErrors,
        setPaymentStatus,
        removeNotice,
        noticeContexts.PAYMENTS,
        isSuccessResponse,
        isFailResponse,
        isErrorResponse,
        addErrorNotice,
    ]);
    var paymentContextData = {
        setPaymentStatus: setPaymentStatus,
        currentStatus: currentStatus,
        paymentStatuses: constants_1.STATUS,
        paymentMethodData: paymentData.paymentMethodData,
        errorMessage: paymentData.errorMessage,
        activePaymentMethod: activePaymentMethod,
        setActivePaymentMethod: setActivePaymentMethod,
        activeSavedToken: activeSavedToken,
        setActiveSavedToken: setActiveSavedToken,
        onPaymentProcessing: onPaymentProcessing,
        customerPaymentMethods: customerPaymentMethods,
        paymentMethods: paymentData.paymentMethods,
        expressPaymentMethods: paymentData.expressPaymentMethods,
        paymentMethodsInitialized: paymentMethodsInitialized,
        expressPaymentMethodsInitialized: expressPaymentMethodsInitialized,
        setExpressPaymentError: setExpressPaymentError,
        isExpressPaymentMethodActive: isExpressPaymentMethodActive,
        shouldSavePayment: paymentData.shouldSavePaymentMethod,
        setShouldSavePayment: dispatchActions.setShouldSavePayment,
    };
    return (<PaymentMethodDataContext.Provider value={paymentContextData}>
			{children}
		</PaymentMethodDataContext.Provider>);
};
exports.PaymentMethodDataProvider = PaymentMethodDataProvider;
