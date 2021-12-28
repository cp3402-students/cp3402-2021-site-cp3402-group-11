"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreAddToCart = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var data_1 = require("@wordpress/data");
var block_data_1 = require("@woocommerce/block-data");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
var use_store_cart_1 = require("./cart/use-store-cart");
var use_store_notices_1 = require("./use-store-notices");
/**
 * Get the quantity of a product in the cart.
 *
 * @param {Object} cartItems Array of items.
 * @param {number} productId  The product id to look for.
 * @return {number} Quantity in the cart.
 */
var getQuantityFromCartItems = function (cartItems, productId) {
    var productItem = cartItems.find(function (_a) {
        var id = _a.id;
        return id === productId;
    });
    return productItem ? productItem.quantity : 0;
};
/**
 * A custom hook for exposing cart related data for a given product id and an
 * action for adding a single quantity of the product _to_ the cart.
 *
 *
 * @param {number} productId  The product id to be added to the cart.
 *
 * @return {StoreCartItemAddToCart} An object exposing data and actions relating
 *                                  to add to cart functionality.
 */
var useStoreAddToCart = function (productId) {
    var addItemToCart = (0, data_1.useDispatch)(block_data_1.CART_STORE_KEY).addItemToCart;
    var _a = (0, use_store_cart_1.useStoreCart)(), cartItems = _a.cartItems, cartIsLoading = _a.cartIsLoading;
    var _b = (0, use_store_notices_1.useStoreNotices)(), addErrorNotice = _b.addErrorNotice, removeNotice = _b.removeNotice;
    var _c = (0, element_1.useState)(false), addingToCart = _c[0], setAddingToCart = _c[1];
    var currentCartItemQuantity = (0, element_1.useRef)(getQuantityFromCartItems(cartItems, productId));
    var addToCart = function (quantity) {
        if (quantity === void 0) { quantity = 1; }
        setAddingToCart(true);
        return addItemToCart(productId, quantity)
            .then(function () {
            removeNotice('add-to-cart');
        })
            .catch(function (error) {
            addErrorNotice((0, html_entities_1.decodeEntities)(error.message), {
                context: 'wc/all-products',
                id: 'add-to-cart',
                isDismissible: true,
            });
        })
            .finally(function () {
            setAddingToCart(false);
        });
    };
    (0, element_1.useEffect)(function () {
        var quantity = getQuantityFromCartItems(cartItems, productId);
        if (quantity !== currentCartItemQuantity.current) {
            currentCartItemQuantity.current = quantity;
        }
    }, [cartItems, productId]);
    return {
        cartQuantity: Number.isFinite(currentCartItemQuantity.current)
            ? currentCartItemQuantity.current
            : 0,
        addingToCart: addingToCart,
        cartIsLoading: cartIsLoading,
        addToCart: addToCart,
    };
};
exports.useStoreAddToCart = useStoreAddToCart;
