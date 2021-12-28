"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreCartItemQuantity = void 0;
/**
 * External dependencies
 */
var data_1 = require("@wordpress/data");
var element_1 = require("@wordpress/element");
var block_data_1 = require("@woocommerce/block-data");
var use_debounce_1 = require("use-debounce");
var base_hooks_1 = require("@woocommerce/base-hooks");
var base_utils_1 = require("@woocommerce/base-utils");
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
var use_store_cart_1 = require("./use-store-cart");
var cart_checkout_1 = require("../../providers/cart-checkout");
/**
 * Ensures the object passed has props key: string and quantity: number
 */
var cartItemHasQuantityAndKey = function (cartItem /* Object that may have quantity and key */) {
    return (0, types_1.isObject)(cartItem) &&
        (0, types_1.objectHasProp)(cartItem, 'key') &&
        (0, types_1.objectHasProp)(cartItem, 'quantity') &&
        (0, types_1.isString)(cartItem.key) &&
        (0, types_1.isNumber)(cartItem.quantity);
};
/**
 * This is a custom hook for loading the Store API /cart/ endpoint and actions for removing or changing item quantity.
 *
 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/RestApi/StoreApi
 *
 * @param {CartItem} cartItem      The cartItem to get quantity info from and will have quantity updated on.
 * @return {StoreCartItemQuantity} An object exposing data and actions relating to cart items.
 */
var useStoreCartItemQuantity = function (cartItem) {
    var verifiedCartItem = { key: '', quantity: 1 };
    if (cartItemHasQuantityAndKey(cartItem)) {
        verifiedCartItem.key = cartItem.key;
        verifiedCartItem.quantity = cartItem.quantity;
    }
    var _a = verifiedCartItem.key, cartItemKey = _a === void 0 ? '' : _a, _b = verifiedCartItem.quantity, cartItemQuantity = _b === void 0 ? 1 : _b;
    var cartErrors = (0, use_store_cart_1.useStoreCart)().cartErrors;
    var dispatchActions = (0, cart_checkout_1.useCheckoutContext)().dispatchActions;
    // Store quantity in hook state. This is used to keep the UI updated while server request is updated.
    var _c = (0, element_1.useState)(cartItemQuantity), quantity = _c[0], setQuantity = _c[1];
    var debouncedQuantity = (0, use_debounce_1.useDebounce)(quantity, 400)[0];
    var previousDebouncedQuantity = (0, base_hooks_1.usePrevious)(debouncedQuantity);
    var _d = (0, data_1.useDispatch)(block_data_1.CART_STORE_KEY), removeItemFromCart = _d.removeItemFromCart, changeCartItemQuantity = _d.changeCartItemQuantity;
    // Track when things are already pending updates.
    var isPending = (0, data_1.useSelect)(function (select) {
        if (!cartItemKey) {
            return {
                quantity: false,
                delete: false,
            };
        }
        var store = select(block_data_1.CART_STORE_KEY);
        return {
            quantity: store.isItemPendingQuantity(cartItemKey),
            delete: store.isItemPendingDelete(cartItemKey),
        };
    }, [cartItemKey]);
    var removeItem = (0, element_1.useCallback)(function () {
        return cartItemKey
            ? removeItemFromCart(cartItemKey).then(function () {
                (0, base_utils_1.triggerFragmentRefresh)();
                return true;
            })
            : Promise.resolve(false);
    }, [cartItemKey, removeItemFromCart]);
    // Observe debounced quantity value, fire action to update server on change.
    (0, element_1.useEffect)(function () {
        if (cartItemKey &&
            (0, types_1.isNumber)(previousDebouncedQuantity) &&
            Number.isFinite(previousDebouncedQuantity) &&
            previousDebouncedQuantity !== debouncedQuantity) {
            changeCartItemQuantity(cartItemKey, debouncedQuantity);
        }
    }, [
        cartItemKey,
        changeCartItemQuantity,
        debouncedQuantity,
        previousDebouncedQuantity,
    ]);
    (0, element_1.useEffect)(function () {
        if (isPending.delete) {
            dispatchActions.incrementCalculating();
        }
        else {
            dispatchActions.decrementCalculating();
        }
        return function () {
            if (isPending.delete) {
                dispatchActions.decrementCalculating();
            }
        };
    }, [dispatchActions, isPending.delete]);
    (0, element_1.useEffect)(function () {
        if (isPending.quantity || debouncedQuantity !== quantity) {
            dispatchActions.incrementCalculating();
        }
        else {
            dispatchActions.decrementCalculating();
        }
        return function () {
            if (isPending.quantity || debouncedQuantity !== quantity) {
                dispatchActions.decrementCalculating();
            }
        };
    }, [dispatchActions, isPending.quantity, debouncedQuantity, quantity]);
    return {
        isPendingDelete: isPending.delete,
        quantity: quantity,
        setItemQuantity: setQuantity,
        removeItem: removeItem,
        cartItemQuantityErrors: cartErrors,
    };
};
exports.useStoreCartItemQuantity = useStoreCartItemQuantity;
