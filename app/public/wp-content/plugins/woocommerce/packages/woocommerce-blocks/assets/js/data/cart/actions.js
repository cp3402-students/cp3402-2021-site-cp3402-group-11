"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerData = exports.selectShippingRate = exports.changeCartItemQuantity = exports.removeItemFromCart = exports.addItemToCart = exports.removeCoupon = exports.applyCoupon = exports.applyExtensionCartUpdate = exports.triggerAddedToCartEvent = exports.triggerAddingToCartEvent = exports.updateCartFragments = exports.shippingRatesBeingSelected = exports.updatingCustomerData = exports.setIsCartDataStale = exports.itemIsPendingDelete = exports.itemIsPendingQuantity = exports.receiveCartItem = exports.receiveRemovingCoupon = exports.receiveApplyingCoupon = exports.receiveError = exports.receiveCart = void 0;
/**
 * External dependencies
 */
var data_controls_1 = require("@wordpress/data-controls");
var lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
var action_types_1 = require("./action-types");
var constants_1 = require("./constants");
var shared_controls_1 = require("../shared-controls");
/**
 * Returns an action object used in updating the store with the provided items
 * retrieved from a request using the given querystring.
 *
 * This is a generic response action.
 *
 * @param  {CartResponse}      response
 */
var receiveCart = function (response) {
    var cart = (0, lodash_1.mapKeys)(response, function (_, key) {
        return (0, lodash_1.camelCase)(key);
    });
    return {
        type: action_types_1.ACTION_TYPES.RECEIVE_CART,
        response: cart,
    };
};
exports.receiveCart = receiveCart;
/**
 * Returns an action object used for receiving customer facing errors from the API.
 *
 * @param   {ResponseError|null} [error=null]     An error object containing the error
 *                                         message and response code.
 * @param   {boolean}       [replace=true] Should existing errors be replaced,
 *                                         or should the error be appended.
 */
var receiveError = function (error, replace) {
    if (error === void 0) { error = null; }
    if (replace === void 0) { replace = true; }
    return ({
        type: replace ? action_types_1.ACTION_TYPES.REPLACE_ERRORS : action_types_1.ACTION_TYPES.RECEIVE_ERROR,
        error: error,
    });
};
exports.receiveError = receiveError;
/**
 * Returns an action object used to track when a coupon is applying.
 *
 * @param  {string} [couponCode] Coupon being added.
 */
var receiveApplyingCoupon = function (couponCode) {
    return ({
        type: action_types_1.ACTION_TYPES.APPLYING_COUPON,
        couponCode: couponCode,
    });
};
exports.receiveApplyingCoupon = receiveApplyingCoupon;
/**
 * Returns an action object used to track when a coupon is removing.
 *
 * @param   {string} [couponCode] Coupon being removed..
 */
var receiveRemovingCoupon = function (couponCode) {
    return ({
        type: action_types_1.ACTION_TYPES.REMOVING_COUPON,
        couponCode: couponCode,
    });
};
exports.receiveRemovingCoupon = receiveRemovingCoupon;
/**
 * Returns an action object for updating a single cart item in the store.
 *
 * @param  {CartResponseItem} [response=null] A cart item API response.
 */
var receiveCartItem = function (response) {
    if (response === void 0) { response = null; }
    return ({
        type: action_types_1.ACTION_TYPES.RECEIVE_CART_ITEM,
        cartItem: response,
    });
};
exports.receiveCartItem = receiveCartItem;
/**
 * Returns an action object to indicate if the specified cart item quantity is
 * being updated.
 *
 * @param   {string}  cartItemKey              Cart item being updated.
 * @param   {boolean} [isPendingQuantity=true] Flag for update state; true if API
 *                                             request is pending.
 */
var itemIsPendingQuantity = function (cartItemKey, isPendingQuantity) {
    if (isPendingQuantity === void 0) { isPendingQuantity = true; }
    return ({
        type: action_types_1.ACTION_TYPES.ITEM_PENDING_QUANTITY,
        cartItemKey: cartItemKey,
        isPendingQuantity: isPendingQuantity,
    });
};
exports.itemIsPendingQuantity = itemIsPendingQuantity;
/**
 * Returns an action object to remove a cart item from the store.
 *
 * @param   {string}  cartItemKey            Cart item to remove.
 * @param   {boolean} [isPendingDelete=true] Flag for update state; true if API
 *                                           request is pending.
 */
var itemIsPendingDelete = function (cartItemKey, isPendingDelete) {
    if (isPendingDelete === void 0) { isPendingDelete = true; }
    return ({
        type: action_types_1.ACTION_TYPES.RECEIVE_REMOVED_ITEM,
        cartItemKey: cartItemKey,
        isPendingDelete: isPendingDelete,
    });
};
exports.itemIsPendingDelete = itemIsPendingDelete;
/**
 * Returns an action object to mark the cart data in the store as stale.
 *
 * @param   {boolean} [isCartDataStale=true] Flag to mark cart data as stale; true if
 * 											 lastCartUpdate timestamp is newer than the
 * 											 one in wcSettings.
 */
var setIsCartDataStale = function (isCartDataStale) {
    if (isCartDataStale === void 0) { isCartDataStale = true; }
    return ({
        type: action_types_1.ACTION_TYPES.SET_IS_CART_DATA_STALE,
        isCartDataStale: isCartDataStale,
    });
};
exports.setIsCartDataStale = setIsCartDataStale;
/**
 * Returns an action object used to track when customer data is being updated
 * (billing and/or shipping).
 */
var updatingCustomerData = function (isResolving) {
    return ({
        type: action_types_1.ACTION_TYPES.UPDATING_CUSTOMER_DATA,
        isResolving: isResolving,
    });
};
exports.updatingCustomerData = updatingCustomerData;
/**
 * Returns an action object used to track whether the shipping rate is being
 * selected or not.
 *
 * @param  {boolean} isResolving True if shipping rate is being selected.
 */
var shippingRatesBeingSelected = function (isResolving) {
    return ({
        type: action_types_1.ACTION_TYPES.UPDATING_SELECTED_SHIPPING_RATE,
        isResolving: isResolving,
    });
};
exports.shippingRatesBeingSelected = shippingRatesBeingSelected;
/**
 * Returns an action object for updating legacy cart fragments.
 */
var updateCartFragments = function () {
    return ({
        type: action_types_1.ACTION_TYPES.UPDATE_LEGACY_CART_FRAGMENTS,
    });
};
exports.updateCartFragments = updateCartFragments;
/**
 * Triggers an adding to cart event so other blocks can update accordingly.
 */
var triggerAddingToCartEvent = function () {
    return ({
        type: action_types_1.ACTION_TYPES.TRIGGER_ADDING_TO_CART_EVENT,
    });
};
exports.triggerAddingToCartEvent = triggerAddingToCartEvent;
/**
 * Triggers an added to cart event so other blocks can update accordingly.
 */
var triggerAddedToCartEvent = function (_a) {
    var preserveCartData = _a.preserveCartData;
    return ({
        type: action_types_1.ACTION_TYPES.TRIGGER_ADDED_TO_CART_EVENT,
        preserveCartData: preserveCartData,
    });
};
exports.triggerAddedToCartEvent = triggerAddedToCartEvent;
/**
 * POSTs to the /cart/extensions endpoint with the data supplied by the extension.
 *
 * @param {Object} args The data to be posted to the endpoint
 */
function applyExtensionCartUpdate(args) {
    var response, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 8]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: '/wc/store/cart/extensions',
                        method: 'POST',
                        data: { namespace: args.namespace, data: args.data },
                        cache: 'no-store',
                    })];
            case 1:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 2:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 3:
                _b.sent();
                return [2 /*return*/, response];
            case 4:
                error_1 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_1)];
            case 5:
                _b.sent();
                if (!((_a = error_1.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, exports.receiveCart)(error_1.data.cart)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: 
            // Re-throw the error.
            throw error_1;
            case 8: return [2 /*return*/];
        }
    });
}
exports.applyExtensionCartUpdate = applyExtensionCartUpdate;
/**
 * Applies a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be applied.
 *
 * @param  {string} couponCode The coupon code to apply to the cart.
 * @throws            Will throw an error if there is an API problem.
 */
function applyCoupon(couponCode) {
    var response, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.receiveApplyingCoupon)(couponCode)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, , 12]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: '/wc/store/cart/apply-coupon',
                        method: 'POST',
                        data: {
                            code: couponCode,
                        },
                        cache: 'no-store',
                    })];
            case 3:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, exports.receiveApplyingCoupon)('')];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 6:
                _b.sent();
                return [3 /*break*/, 12];
            case 7:
                error_2 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_2)];
            case 8:
                _b.sent();
                return [4 /*yield*/, (0, exports.receiveApplyingCoupon)('')];
            case 9:
                _b.sent();
                if (!((_a = error_2.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, exports.receiveCart)(error_2.data.cart)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: 
            // Re-throw the error.
            throw error_2;
            case 12: return [2 /*return*/, true];
        }
    });
}
exports.applyCoupon = applyCoupon;
/**
 * Removes a coupon code and either invalidates caches, or receives an error if
 * the coupon cannot be removed.
 *
 * @param  {string} couponCode The coupon code to remove from the cart.
 * @throws            Will throw an error if there is an API problem.
 */
function removeCoupon(couponCode) {
    var response, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.receiveRemovingCoupon)(couponCode)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, , 12]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: '/wc/store/cart/remove-coupon',
                        method: 'POST',
                        data: {
                            code: couponCode,
                        },
                        cache: 'no-store',
                    })];
            case 3:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, exports.receiveRemovingCoupon)('')];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 6:
                _b.sent();
                return [3 /*break*/, 12];
            case 7:
                error_3 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_3)];
            case 8:
                _b.sent();
                return [4 /*yield*/, (0, exports.receiveRemovingCoupon)('')];
            case 9:
                _b.sent();
                if (!((_a = error_3.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 11];
                return [4 /*yield*/, (0, exports.receiveCart)(error_3.data.cart)];
            case 10:
                _b.sent();
                _b.label = 11;
            case 11: 
            // Re-throw the error.
            throw error_3;
            case 12: return [2 /*return*/, true];
        }
    });
}
exports.removeCoupon = removeCoupon;
/**
 * Adds an item to the cart:
 * - Calls API to add item.
 * - If successful, yields action to add item from store.
 * - If error, yields action to store error.
 *
 * @param  {number} productId    Product ID to add to cart.
 * @param  {number} [quantity=1] Number of product ID being added to cart.
 * @throws           Will throw an error if there is an API problem.
 */
function addItemToCart(productId, quantity) {
    var response, error_4;
    var _a;
    if (quantity === void 0) { quantity = 1; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 10]);
                return [4 /*yield*/, (0, exports.triggerAddingToCartEvent)()];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: "/wc/store/cart/add-item",
                        method: 'POST',
                        data: {
                            id: productId,
                            quantity: quantity,
                        },
                        cache: 'no-store',
                    })];
            case 2:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 3:
                _b.sent();
                return [4 /*yield*/, (0, exports.triggerAddedToCartEvent)({ preserveCartData: true })];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 5:
                _b.sent();
                return [3 /*break*/, 10];
            case 6:
                error_4 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_4)];
            case 7:
                _b.sent();
                if (!((_a = error_4.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, exports.receiveCart)(error_4.data.cart)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: 
            // Re-throw the error.
            throw error_4;
            case 10: return [2 /*return*/];
        }
    });
}
exports.addItemToCart = addItemToCart;
/**
 * Removes specified item from the cart:
 * - Calls API to remove item.
 * - If successful, yields action to remove item from store.
 * - If error, yields action to store error.
 * - Sets cart item as pending while API request is in progress.
 *
 * @param {string} cartItemKey Cart item being updated.
 */
function removeItemFromCart(cartItemKey) {
    var response, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.itemIsPendingDelete)(cartItemKey)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 10]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: "/wc/store/cart/remove-item",
                        data: {
                            key: cartItemKey,
                        },
                        method: 'POST',
                        cache: 'no-store',
                    })];
            case 3:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 4:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 5:
                _b.sent();
                return [3 /*break*/, 10];
            case 6:
                error_5 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_5)];
            case 7:
                _b.sent();
                if (!((_a = error_5.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, exports.receiveCart)(error_5.data.cart)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [3 /*break*/, 10];
            case 10: return [4 /*yield*/, (0, exports.itemIsPendingDelete)(cartItemKey, false)];
            case 11:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
exports.removeItemFromCart = removeItemFromCart;
/**
 * Persists a quantity change the for specified cart item:
 * - Calls API to set quantity.
 * - If successful, yields action to update store.
 * - If error, yields action to store error.
 *
 * @param {string} cartItemKey Cart item being updated.
 * @param {number} quantity    Specified (new) quantity.
 */
function changeCartItemQuantity(cartItemKey, quantity
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- unclear how to represent multiple different yields as type
) {
    var cartItem, response, error_6;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, data_controls_1.select)(constants_1.STORE_KEY, 'getCartItem', cartItemKey)];
            case 1:
                cartItem = _b.sent();
                return [4 /*yield*/, (0, exports.itemIsPendingQuantity)(cartItemKey)];
            case 2:
                _b.sent();
                if ((cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) === quantity) {
                    return [2 /*return*/];
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 7, , 11]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: '/wc/store/cart/update-item',
                        method: 'POST',
                        data: {
                            key: cartItemKey,
                            quantity: quantity,
                        },
                        cache: 'no-store',
                    })];
            case 4:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, exports.updateCartFragments)()];
            case 6:
                _b.sent();
                return [3 /*break*/, 11];
            case 7:
                error_6 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_6)];
            case 8:
                _b.sent();
                if (!((_a = error_6.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 10];
                return [4 /*yield*/, (0, exports.receiveCart)(error_6.data.cart)];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [3 /*break*/, 11];
            case 11: return [4 /*yield*/, (0, exports.itemIsPendingQuantity)(cartItemKey, false)];
            case 12:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
exports.changeCartItemQuantity = changeCartItemQuantity;
/**
 * Selects a shipping rate.
 *
 * @param {string}          rateId      The id of the rate being selected.
 * @param {number | string} [packageId] The key of the packages that we will
 *   select within.
 */
function selectShippingRate(rateId, packageId) {
    var response, error_7;
    var _a;
    if (packageId === void 0) { packageId = 0; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 9]);
                return [4 /*yield*/, (0, exports.shippingRatesBeingSelected)(true)];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: "/wc/store/cart/select-shipping-rate",
                        method: 'POST',
                        data: {
                            package_id: packageId,
                            rate_id: rateId,
                        },
                        cache: 'no-store',
                    })];
            case 2:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 3:
                _b.sent();
                return [3 /*break*/, 9];
            case 4:
                error_7 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_7)];
            case 5:
                _b.sent();
                return [4 /*yield*/, (0, exports.shippingRatesBeingSelected)(false)];
            case 6:
                _b.sent();
                if (!((_a = error_7.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, exports.receiveCart)(error_7.data.cart)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8: 
            // Re-throw the error.
            throw error_7;
            case 9: return [4 /*yield*/, (0, exports.shippingRatesBeingSelected)(false)];
            case 10:
                _b.sent();
                return [2 /*return*/, true];
        }
    });
}
exports.selectShippingRate = selectShippingRate;
/**
 * Updates the shipping and/or billing address for the customer and returns an
 * updated cart.
 *
 * @param {BillingAddressShippingAddress} customerData Address data to be updated; can contain both
 *   billing_address and shipping_address.
 */
function updateCustomerData(customerData) {
    var response, error_8;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.updatingCustomerData)(true)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 10]);
                return [4 /*yield*/, (0, shared_controls_1.apiFetchWithHeaders)({
                        path: '/wc/store/cart/update-customer',
                        method: 'POST',
                        data: customerData,
                        cache: 'no-store',
                    })];
            case 3:
                response = (_b.sent()).response;
                return [4 /*yield*/, (0, exports.receiveCart)(response)];
            case 4:
                _b.sent();
                return [3 /*break*/, 10];
            case 5:
                error_8 = _b.sent();
                return [4 /*yield*/, (0, exports.receiveError)(error_8)];
            case 6:
                _b.sent();
                return [4 /*yield*/, (0, exports.updatingCustomerData)(false)];
            case 7:
                _b.sent();
                if (!((_a = error_8.data) === null || _a === void 0 ? void 0 : _a.cart)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, exports.receiveCart)(error_8.data.cart)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: 
            // rethrow error.
            throw error_8;
            case 10: return [4 /*yield*/, (0, exports.updatingCustomerData)(false)];
            case 11:
                _b.sent();
                return [2 /*return*/, true];
        }
    });
}
exports.updateCustomerData = updateCustomerData;
