"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isShippingRateBeingSelected = exports.isCustomerDataUpdating = exports.isItemPendingDelete = exports.isItemPendingQuantity = exports.getCartItem = exports.getCouponBeingRemoved = exports.isRemovingCoupon = exports.getCouponBeingApplied = exports.isCartDataStale = exports.isApplyingCoupon = exports.getCartErrors = exports.getCartMeta = exports.getCartTotals = exports.getCartData = void 0;
/**
 * Internal dependencies
 */
var default_states_1 = require("../default-states");
/**
 * Retrieves cart data from state.
 *
 * @param {CartState} state The current state.
 * @return {Cart} The data to return.
 */
var getCartData = function (state) {
    return state.cartData;
};
exports.getCartData = getCartData;
/**
 * Retrieves cart totals from state.
 *
 * @param {CartState} state The current state.
 * @return {CartTotals} The data to return.
 */
var getCartTotals = function (state) {
    return state.cartData.totals || default_states_1.defaultCartState.cartData.totals;
};
exports.getCartTotals = getCartTotals;
/**
 * Retrieves cart meta from state.
 *
 * @param {CartState} state The current state.
 * @return {CartMeta} The data to return.
 */
var getCartMeta = function (state) {
    return state.metaData || default_states_1.defaultCartState.metaData;
};
exports.getCartMeta = getCartMeta;
/**
 * Retrieves cart errors from state.
 *
 * @param {CartState} state The current state.
 * @return {Array<ResponseError>} Array of errors.
 */
var getCartErrors = function (state) {
    return state.errors;
};
exports.getCartErrors = getCartErrors;
/**
 * Returns true if any coupon is being applied.
 *
 * @param {CartState} state The current state.
 * @return {boolean} True if a coupon is being applied.
 */
var isApplyingCoupon = function (state) {
    return !!state.metaData.applyingCoupon;
};
exports.isApplyingCoupon = isApplyingCoupon;
/**
 * Returns true if cart is stale, false if it is not.
 *
 * @param {CartState} state The current state.
 * @return {boolean} True if the cart data is stale.
 */
var isCartDataStale = function (state) {
    return state.metaData.isCartDataStale;
};
exports.isCartDataStale = isCartDataStale;
/**
 * Retrieves the coupon code currently being applied.
 *
 * @param {CartState} state The current state.
 * @return {string} The data to return.
 */
var getCouponBeingApplied = function (state) {
    return state.metaData.applyingCoupon || '';
};
exports.getCouponBeingApplied = getCouponBeingApplied;
/**
 * Returns true if any coupon is being removed.
 *
 * @param {CartState} state The current state.
 * @return {boolean} True if a coupon is being removed.
 */
var isRemovingCoupon = function (state) {
    return !!state.metaData.removingCoupon;
};
exports.isRemovingCoupon = isRemovingCoupon;
/**
 * Retrieves the coupon code currently being removed.
 *
 * @param {CartState} state The current state.
 * @return {string} The data to return.
 */
var getCouponBeingRemoved = function (state) {
    return state.metaData.removingCoupon || '';
};
exports.getCouponBeingRemoved = getCouponBeingRemoved;
/**
 * Returns cart item matching specified key.
 *
 * @param {CartState} state The current state.
 * @param {string} cartItemKey Key for a cart item.
 * @return {CartItem | void} Cart item object, or undefined if not found.
 */
var getCartItem = function (state, cartItemKey) {
    return state.cartData.items.find(function (cartItem) { return cartItem.key === cartItemKey; });
};
exports.getCartItem = getCartItem;
/**
 * Returns true if the specified cart item quantity is being updated.
 *
 * @param {CartState} state The current state.
 * @param {string} cartItemKey Key for a cart item.
 * @return {boolean} True if a item has a pending request to be updated.
 */
var isItemPendingQuantity = function (state, cartItemKey) {
    return state.cartItemsPendingQuantity.includes(cartItemKey);
};
exports.isItemPendingQuantity = isItemPendingQuantity;
/**
 * Returns true if the specified cart item quantity is being updated.
 *
 * @param {CartState} state The current state.
 * @param {string} cartItemKey Key for a cart item.
 * @return {boolean} True if a item has a pending request to be updated.
 */
var isItemPendingDelete = function (state, cartItemKey) {
    return state.cartItemsPendingDelete.includes(cartItemKey);
};
exports.isItemPendingDelete = isItemPendingDelete;
/**
 * Retrieves if the address is being applied for shipping.
 *
 * @param {CartState} state The current state.
 * @return {boolean} are shipping rates loading.
 */
var isCustomerDataUpdating = function (state) {
    return !!state.metaData.updatingCustomerData;
};
exports.isCustomerDataUpdating = isCustomerDataUpdating;
/**
 * Retrieves if the shipping rate selection is being persisted.
 *
 * @param {CartState} state The current state.
 *
 * @return {boolean} True if the shipping rate selection is being persisted to
 *                   the server.
 */
var isShippingRateBeingSelected = function (state) {
    return !!state.metaData.updatingSelectedRate;
};
exports.isShippingRateBeingSelected = isShippingRateBeingSelected;
