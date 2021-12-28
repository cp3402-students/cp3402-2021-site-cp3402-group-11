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
exports.reducer = void 0;
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
var actions_1 = require("./actions");
/**
 * Reducer for the checkout state
 */
var reducer = function (state, _a) {
    if (state === void 0) { state = constants_1.DEFAULT_STATE; }
    var redirectUrl = _a.redirectUrl, type = _a.type, customerId = _a.customerId, orderId = _a.orderId, orderNotes = _a.orderNotes, extensionData = _a.extensionData, shouldCreateAccount = _a.shouldCreateAccount, data = _a.data;
    var newState = state;
    switch (type) {
        case actions_1.ACTION.SET_PRISTINE:
            newState = constants_1.DEFAULT_STATE;
            break;
        case actions_1.ACTION.SET_IDLE:
            newState =
                state.status !== constants_1.STATUS.IDLE
                    ? __assign(__assign({}, state), { status: constants_1.STATUS.IDLE }) : state;
            break;
        case actions_1.ACTION.SET_REDIRECT_URL:
            newState =
                redirectUrl !== undefined && redirectUrl !== state.redirectUrl
                    ? __assign(__assign({}, state), { redirectUrl: redirectUrl }) : state;
            break;
        case actions_1.ACTION.SET_PROCESSING_RESPONSE:
            newState = __assign(__assign({}, state), { processingResponse: data });
            break;
        case actions_1.ACTION.SET_COMPLETE:
            newState =
                state.status !== constants_1.STATUS.COMPLETE
                    ? __assign(__assign({}, state), { status: constants_1.STATUS.COMPLETE, 
                        // @todo Investigate why redirectURL could be non-truthy and whether this would cause a bug if multiple gateways were used for payment e.g. 1st set the redirect URL but failed, and then the 2nd did not provide a redirect URL and succeeded.
                        redirectUrl: data !== undefined &&
                            typeof data.redirectUrl === 'string' &&
                            data.redirectUrl
                            ? data.redirectUrl
                            : state.redirectUrl }) : state;
            break;
        case actions_1.ACTION.SET_PROCESSING:
            newState =
                state.status !== constants_1.STATUS.PROCESSING
                    ? __assign(__assign({}, state), { status: constants_1.STATUS.PROCESSING, hasError: false }) : state;
            // clear any error state.
            newState =
                newState.hasError === false
                    ? newState
                    : __assign(__assign({}, newState), { hasError: false });
            break;
        case actions_1.ACTION.SET_BEFORE_PROCESSING:
            newState =
                state.status !== constants_1.STATUS.BEFORE_PROCESSING
                    ? __assign(__assign({}, state), { status: constants_1.STATUS.BEFORE_PROCESSING, hasError: false }) : state;
            break;
        case actions_1.ACTION.SET_AFTER_PROCESSING:
            newState =
                state.status !== constants_1.STATUS.AFTER_PROCESSING
                    ? __assign(__assign({}, state), { status: constants_1.STATUS.AFTER_PROCESSING }) : state;
            break;
        case actions_1.ACTION.SET_HAS_ERROR:
            newState = state.hasError
                ? state
                : __assign(__assign({}, state), { hasError: true });
            newState =
                state.status === constants_1.STATUS.PROCESSING ||
                    state.status === constants_1.STATUS.BEFORE_PROCESSING
                    ? __assign(__assign({}, newState), { status: constants_1.STATUS.IDLE }) : newState;
            break;
        case actions_1.ACTION.SET_NO_ERROR:
            newState = state.hasError
                ? __assign(__assign({}, state), { hasError: false }) : state;
            break;
        case actions_1.ACTION.INCREMENT_CALCULATING:
            newState = __assign(__assign({}, state), { calculatingCount: state.calculatingCount + 1 });
            break;
        case actions_1.ACTION.DECREMENT_CALCULATING:
            newState = __assign(__assign({}, state), { calculatingCount: Math.max(0, state.calculatingCount - 1) });
            break;
        case actions_1.ACTION.SET_CUSTOMER_ID:
            newState =
                customerId !== undefined
                    ? __assign(__assign({}, state), { customerId: customerId }) : state;
            break;
        case actions_1.ACTION.SET_ORDER_ID:
            newState =
                orderId !== undefined
                    ? __assign(__assign({}, state), { orderId: orderId }) : state;
            break;
        case actions_1.ACTION.SET_SHOULD_CREATE_ACCOUNT:
            if (shouldCreateAccount !== undefined &&
                shouldCreateAccount !== state.shouldCreateAccount) {
                newState = __assign(__assign({}, state), { shouldCreateAccount: shouldCreateAccount });
            }
            break;
        case actions_1.ACTION.SET_ORDER_NOTES:
            if (orderNotes !== undefined && state.orderNotes !== orderNotes) {
                newState = __assign(__assign({}, state), { orderNotes: orderNotes });
            }
            break;
        case actions_1.ACTION.SET_EXTENSION_DATA:
            if (extensionData !== undefined &&
                state.extensionData !== extensionData) {
                newState = __assign(__assign({}, state), { extensionData: extensionData });
            }
            break;
    }
    // automatically update state to idle from pristine as soon as it
    // initially changes.
    if (newState !== state &&
        type !== actions_1.ACTION.SET_PRISTINE &&
        newState.status === constants_1.STATUS.PRISTINE) {
        newState.status = constants_1.STATUS.IDLE;
    }
    return newState;
};
exports.reducer = reducer;
