"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutStateProvider = exports.useCheckoutContext = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var i18n_1 = require("@wordpress/i18n");
var base_hooks_1 = require("@woocommerce/base-hooks");
var deprecated_1 = require("@wordpress/deprecated");
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
var actions_1 = require("./actions");
var reducer_1 = require("./reducer");
var utils_1 = require("./utils");
var constants_1 = require("./constants");
var event_emit_1 = require("./event-emit");
var validation_1 = require("../../validation");
var use_store_notices_1 = require("../../../hooks/use-store-notices");
var use_store_events_1 = require("../../../hooks/use-store-events");
var use_checkout_notices_1 = require("../../../hooks/use-checkout-notices");
var use_emit_response_1 = require("../../../hooks/use-emit-response");
/**
 * @typedef {import('@woocommerce/type-defs/contexts').CheckoutDataContext} CheckoutDataContext
 */
var CheckoutContext = (0, element_1.createContext)(constants_1.DEFAULT_CHECKOUT_STATE_DATA);
var useCheckoutContext = function () {
    return (0, element_1.useContext)(CheckoutContext);
};
exports.useCheckoutContext = useCheckoutContext;
/**
 * Checkout state provider
 * This provides an API interface exposing checkout state for use with cart or checkout blocks.
 *
 * @param {Object}  props                     Incoming props for the provider.
 * @param {Object}  props.children            The children being wrapped.
 * @param {string}  props.redirectUrl         Initialize what the checkout will redirect to after successful submit.
 * @param {boolean} props.isCart              If context provider is being used in cart context.
 */
var CheckoutStateProvider = function (_a) {
    var children = _a.children, redirectUrl = _a.redirectUrl, _b = _a.isCart, isCart = _b === void 0 ? false : _b;
    // note, this is done intentionally so that the default state now has
    // the redirectUrl for when checkout is reset to PRISTINE state.
    constants_1.DEFAULT_STATE.redirectUrl = redirectUrl;
    var _c = (0, element_1.useReducer)(reducer_1.reducer, constants_1.DEFAULT_STATE), checkoutState = _c[0], dispatch = _c[1];
    var setValidationErrors = (0, validation_1.useValidationContext)().setValidationErrors;
    var _d = (0, use_store_notices_1.useStoreNotices)(), addErrorNotice = _d.addErrorNotice, removeNotices = _d.removeNotices;
    var dispatchCheckoutEvent = (0, use_store_events_1.useStoreEvents)().dispatchCheckoutEvent;
    var isCalculating = checkoutState.calculatingCount > 0;
    var _e = (0, use_emit_response_1.useEmitResponse)(), isSuccessResponse = _e.isSuccessResponse, isErrorResponse = _e.isErrorResponse, isFailResponse = _e.isFailResponse, shouldRetry = _e.shouldRetry;
    var _f = (0, use_checkout_notices_1.useCheckoutNotices)(), checkoutNotices = _f.checkoutNotices, paymentNotices = _f.paymentNotices, expressPaymentNotices = _f.expressPaymentNotices;
    var _g = (0, element_1.useReducer)(event_emit_1.reducer, {}), observers = _g[0], observerDispatch = _g[1];
    var currentObservers = (0, element_1.useRef)(observers);
    var _h = (0, event_emit_1.useEventEmitters)(observerDispatch), onCheckoutAfterProcessingWithSuccess = _h.onCheckoutAfterProcessingWithSuccess, onCheckoutAfterProcessingWithError = _h.onCheckoutAfterProcessingWithError, onCheckoutValidationBeforeProcessing = _h.onCheckoutValidationBeforeProcessing;
    // set observers on ref so it's always current.
    (0, element_1.useEffect)(function () {
        currentObservers.current = observers;
    }, [observers]);
    /**
     * @deprecated use onCheckoutValidationBeforeProcessing instead
     *
     * To prevent the deprecation message being shown at render time
     * we need an extra function between useMemo and event emitters
     * so that the deprecated message gets shown only at invocation time.
     * (useMemo calls the passed function at render time)
     * See: https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4039/commits/a502d1be8828848270993264c64220731b0ae181
     */
    var onCheckoutBeforeProcessing = (0, element_1.useMemo)(function () {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (0, deprecated_1.default)('onCheckoutBeforeProcessing', {
                alternative: 'onCheckoutValidationBeforeProcessing',
                plugin: 'WooCommerce Blocks',
            });
            return onCheckoutValidationBeforeProcessing.apply(void 0, args);
        };
    }, [onCheckoutValidationBeforeProcessing]);
    var dispatchActions = (0, element_1.useMemo)(function () { return ({
        resetCheckout: function () { return void dispatch(actions_1.actions.setPristine()); },
        setRedirectUrl: function (url) {
            return void dispatch(actions_1.actions.setRedirectUrl(url));
        },
        setHasError: function (hasError) {
            return void dispatch(actions_1.actions.setHasError(hasError));
        },
        incrementCalculating: function () {
            return void dispatch(actions_1.actions.incrementCalculating());
        },
        decrementCalculating: function () {
            return void dispatch(actions_1.actions.decrementCalculating());
        },
        setCustomerId: function (id) {
            return void dispatch(actions_1.actions.setCustomerId(id));
        },
        setOrderId: function (orderId) {
            return void dispatch(actions_1.actions.setOrderId(orderId));
        },
        setOrderNotes: function (orderNotes) {
            return void dispatch(actions_1.actions.setOrderNotes(orderNotes));
        },
        setExtensionData: function (extensionData) {
            return void dispatch(actions_1.actions.setExtensionData(extensionData));
        },
        setAfterProcessing: function (response) {
            var paymentResult = (0, utils_1.getPaymentResultFromCheckoutResponse)(response);
            if (paymentResult.redirectUrl) {
                dispatch(actions_1.actions.setRedirectUrl(paymentResult.redirectUrl));
            }
            dispatch(actions_1.actions.setProcessingResponse(paymentResult));
            dispatch(actions_1.actions.setAfterProcessing());
        },
    }); }, []);
    // emit events.
    (0, element_1.useEffect)(function () {
        var status = checkoutState.status;
        if (status === constants_1.STATUS.BEFORE_PROCESSING) {
            removeNotices('error');
            (0, event_emit_1.emitEvent)(currentObservers.current, event_emit_1.EMIT_TYPES.CHECKOUT_VALIDATION_BEFORE_PROCESSING, {}).then(function (response) {
                if (response !== true) {
                    if (Array.isArray(response)) {
                        response.forEach(function (_a) {
                            var errorMessage = _a.errorMessage, validationErrors = _a.validationErrors;
                            addErrorNotice(errorMessage);
                            setValidationErrors(validationErrors);
                        });
                    }
                    dispatch(actions_1.actions.setIdle());
                    dispatch(actions_1.actions.setHasError());
                }
                else {
                    dispatch(actions_1.actions.setProcessing());
                }
            });
        }
    }, [
        checkoutState.status,
        setValidationErrors,
        addErrorNotice,
        removeNotices,
        dispatch,
    ]);
    var previousStatus = (0, base_hooks_1.usePrevious)(checkoutState.status);
    var previousHasError = (0, base_hooks_1.usePrevious)(checkoutState.hasError);
    (0, element_1.useEffect)(function () {
        if (checkoutState.status === previousStatus &&
            checkoutState.hasError === previousHasError) {
            return;
        }
        var handleErrorResponse = function (observerResponses) {
            var errorResponse = null;
            observerResponses.forEach(function (response) {
                if (isErrorResponse(response) ||
                    isFailResponse(response)) {
                    if (response.message) {
                        var errorOptions = response.messageContext
                            ? { context: response.messageContext }
                            : undefined;
                        errorResponse = response;
                        addErrorNotice(response.message, errorOptions);
                    }
                }
            });
            return errorResponse;
        };
        if (checkoutState.status === constants_1.STATUS.AFTER_PROCESSING) {
            var data_1 = {
                redirectUrl: checkoutState.redirectUrl,
                orderId: checkoutState.orderId,
                customerId: checkoutState.customerId,
                orderNotes: checkoutState.orderNotes,
                processingResponse: checkoutState.processingResponse,
            };
            if (checkoutState.hasError) {
                // allow payment methods or other things to customize the error
                // with a fallback if nothing customizes it.
                (0, event_emit_1.emitEventWithAbort)(currentObservers.current, event_emit_1.EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_ERROR, data_1).then(function (observerResponses) {
                    var _a;
                    var errorResponse = handleErrorResponse(observerResponses);
                    if (errorResponse !== null) {
                        // irrecoverable error so set complete
                        if (!shouldRetry(errorResponse)) {
                            dispatch(actions_1.actions.setComplete(errorResponse));
                        }
                        else {
                            dispatch(actions_1.actions.setIdle());
                        }
                    }
                    else {
                        var hasErrorNotices = checkoutNotices.some(function (notice) {
                            return notice.status === 'error';
                        }) ||
                            expressPaymentNotices.some(function (notice) {
                                return notice.status === 'error';
                            }) ||
                            paymentNotices.some(function (notice) {
                                return notice.status === 'error';
                            });
                        if (!hasErrorNotices) {
                            // no error handling in place by anything so let's fall
                            // back to default
                            var message = ((_a = data_1.processingResponse) === null || _a === void 0 ? void 0 : _a.message) ||
                                (0, i18n_1.__)('Something went wrong. Please contact us to get assistance.', 'woo-gutenberg-products-block');
                            addErrorNotice(message, {
                                id: 'checkout',
                            });
                        }
                        dispatch(actions_1.actions.setIdle());
                    }
                });
            }
            else {
                (0, event_emit_1.emitEventWithAbort)(currentObservers.current, event_emit_1.EMIT_TYPES.CHECKOUT_AFTER_PROCESSING_WITH_SUCCESS, data_1).then(function (observerResponses) {
                    var successResponse = null;
                    var errorResponse = null;
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
                        dispatch(actions_1.actions.setComplete(successResponse));
                    }
                    else if ((0, types_1.isObject)(errorResponse)) {
                        if (errorResponse.message) {
                            var errorOptions = errorResponse.messageContext
                                ? { context: errorResponse.messageContext }
                                : undefined;
                            addErrorNotice(errorResponse.message, errorOptions);
                        }
                        if (!shouldRetry(errorResponse)) {
                            dispatch(actions_1.actions.setComplete(errorResponse));
                        }
                        else {
                            // this will set an error which will end up
                            // triggering the onCheckoutAfterProcessingWithError emitter.
                            // and then setting checkout to IDLE state.
                            dispatch(actions_1.actions.setHasError(true));
                        }
                    }
                    else {
                        // nothing hooked in had any response type so let's just
                        // consider successful
                        dispatch(actions_1.actions.setComplete());
                    }
                });
            }
        }
    }, [
        checkoutState.status,
        checkoutState.hasError,
        checkoutState.redirectUrl,
        checkoutState.orderId,
        checkoutState.customerId,
        checkoutState.orderNotes,
        checkoutState.processingResponse,
        previousStatus,
        previousHasError,
        dispatchActions,
        addErrorNotice,
        isErrorResponse,
        isFailResponse,
        isSuccessResponse,
        shouldRetry,
        checkoutNotices,
        expressPaymentNotices,
        paymentNotices,
    ]);
    var onSubmit = (0, element_1.useCallback)(function () {
        dispatchCheckoutEvent('submit');
        dispatch(actions_1.actions.setBeforeProcessing());
    }, [dispatchCheckoutEvent]);
    var checkoutData = {
        onSubmit: onSubmit,
        isComplete: checkoutState.status === constants_1.STATUS.COMPLETE,
        isIdle: checkoutState.status === constants_1.STATUS.IDLE,
        isCalculating: isCalculating,
        isProcessing: checkoutState.status === constants_1.STATUS.PROCESSING,
        isBeforeProcessing: checkoutState.status === constants_1.STATUS.BEFORE_PROCESSING,
        isAfterProcessing: checkoutState.status === constants_1.STATUS.AFTER_PROCESSING,
        hasError: checkoutState.hasError,
        redirectUrl: checkoutState.redirectUrl,
        onCheckoutBeforeProcessing: onCheckoutBeforeProcessing,
        onCheckoutValidationBeforeProcessing: onCheckoutValidationBeforeProcessing,
        onCheckoutAfterProcessingWithSuccess: onCheckoutAfterProcessingWithSuccess,
        onCheckoutAfterProcessingWithError: onCheckoutAfterProcessingWithError,
        dispatchActions: dispatchActions,
        isCart: isCart,
        orderId: checkoutState.orderId,
        hasOrder: !!checkoutState.orderId,
        customerId: checkoutState.customerId,
        orderNotes: checkoutState.orderNotes,
        shouldCreateAccount: checkoutState.shouldCreateAccount,
        setShouldCreateAccount: function (value) {
            return dispatch(actions_1.actions.setShouldCreateAccount(value));
        },
        extensionData: checkoutState.extensionData,
    };
    return (<CheckoutContext.Provider value={checkoutData}>
			{children}
		</CheckoutContext.Provider>);
};
exports.CheckoutStateProvider = CheckoutStateProvider;
