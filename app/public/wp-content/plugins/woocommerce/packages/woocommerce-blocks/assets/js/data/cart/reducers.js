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
var action_types_1 = require("./action-types");
var default_states_1 = require("../default-states");
var constants_1 = require("../constants");
/**
 * Sub-reducer for cart items array.
 *
 * @param   {Array<CartItem>}  state   cartData.items state slice.
 * @param   {CartAction}  action  Action object.
 */
var cartItemsReducer = function (state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case action_types_1.ACTION_TYPES.RECEIVE_CART_ITEM:
            // Replace specified cart element with the new data from server.
            return state.map(function (cartItem) {
                var _a;
                if (cartItem.key === ((_a = action.cartItem) === null || _a === void 0 ? void 0 : _a.key)) {
                    return action.cartItem;
                }
                return cartItem;
            });
    }
    return state;
};
/**
 * Reducer for receiving items related to the cart.
 *
 * @param   {CartState}  state   The current state in the store.
 * @param   {CartAction}  action  Action object.
 *
 * @return  {CartState}          New or existing state.
 */
var reducer = function (state, action) {
    if (state === void 0) { state = default_states_1.defaultCartState; }
    switch (action.type) {
        case action_types_1.ACTION_TYPES.RECEIVE_ERROR:
            if (action.error) {
                state = __assign(__assign({}, state), { errors: state.errors.concat(action.error) });
            }
            break;
        case action_types_1.ACTION_TYPES.REPLACE_ERRORS:
            if (action.error) {
                state = __assign(__assign({}, state), { errors: [action.error] });
            }
            break;
        case action_types_1.ACTION_TYPES.RECEIVE_CART:
            if (action.response) {
                state = __assign(__assign({}, state), { errors: constants_1.EMPTY_CART_ERRORS, cartData: action.response });
            }
            break;
        case action_types_1.ACTION_TYPES.APPLYING_COUPON:
            if (action.couponCode || action.couponCode === '') {
                state = __assign(__assign({}, state), { metaData: __assign(__assign({}, state.metaData), { applyingCoupon: action.couponCode }) });
            }
            break;
        case action_types_1.ACTION_TYPES.REMOVING_COUPON:
            if (action.couponCode || action.couponCode === '') {
                state = __assign(__assign({}, state), { metaData: __assign(__assign({}, state.metaData), { removingCoupon: action.couponCode }) });
            }
            break;
        case action_types_1.ACTION_TYPES.ITEM_PENDING_QUANTITY:
            // Remove key by default - handles isQuantityPending==false
            // and prevents duplicates when isQuantityPending===true.
            var keysPendingQuantity = state.cartItemsPendingQuantity.filter(function (key) { return key !== action.cartItemKey; });
            if (action.isPendingQuantity && action.cartItemKey) {
                keysPendingQuantity.push(action.cartItemKey);
            }
            state = __assign(__assign({}, state), { cartItemsPendingQuantity: keysPendingQuantity });
            break;
        case action_types_1.ACTION_TYPES.RECEIVE_REMOVED_ITEM:
            var keysPendingDelete = state.cartItemsPendingDelete.filter(function (key) { return key !== action.cartItemKey; });
            if (action.isPendingDelete && action.cartItemKey) {
                keysPendingDelete.push(action.cartItemKey);
            }
            state = __assign(__assign({}, state), { cartItemsPendingDelete: keysPendingDelete });
            break;
        // Delegate to cartItemsReducer.
        case action_types_1.ACTION_TYPES.RECEIVE_CART_ITEM:
            state = __assign(__assign({}, state), { errors: constants_1.EMPTY_CART_ERRORS, cartData: __assign(__assign({}, state.cartData), { items: cartItemsReducer(state.cartData.items, action) }) });
            break;
        case action_types_1.ACTION_TYPES.UPDATING_CUSTOMER_DATA:
            state = __assign(__assign({}, state), { metaData: __assign(__assign({}, state.metaData), { updatingCustomerData: !!action.isResolving }) });
            break;
        case action_types_1.ACTION_TYPES.UPDATING_SELECTED_SHIPPING_RATE:
            state = __assign(__assign({}, state), { metaData: __assign(__assign({}, state.metaData), { updatingSelectedRate: !!action.isResolving }) });
            break;
        case action_types_1.ACTION_TYPES.SET_IS_CART_DATA_STALE:
            state = __assign(__assign({}, state), { metaData: __assign(__assign({}, state.metaData), { isCartDataStale: action.isCartDataStale }) });
            break;
    }
    return state;
};
exports.default = reducer;
