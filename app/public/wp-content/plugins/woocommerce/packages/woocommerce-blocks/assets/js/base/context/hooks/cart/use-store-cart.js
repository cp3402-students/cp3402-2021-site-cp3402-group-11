"use strict";
/** @typedef { import('@woocommerce/type-defs/hooks').StoreCart } StoreCart */
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
exports.useStoreCart = exports.defaultCartData = void 0;
/**
 * External dependencies
 */
var lodash_1 = require("lodash");
var element_1 = require("@wordpress/element");
var block_data_1 = require("@woocommerce/block-data");
var data_1 = require("@wordpress/data");
var html_entities_1 = require("@wordpress/html-entities");
var base_utils_1 = require("@woocommerce/base-utils");
/**
 * Internal dependencies
 */
var editor_context_1 = require("../../providers/editor-context");
var use_store_cart_event_listeners_1 = require("./use-store-cart-event-listeners");
var defaultShippingAddress = {
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
};
var defaultBillingAddress = __assign(__assign({}, defaultShippingAddress), { email: '' });
var defaultCartTotals = {
    total_items: '',
    total_items_tax: '',
    total_fees: '',
    total_fees_tax: '',
    total_discount: '',
    total_discount_tax: '',
    total_shipping: '',
    total_shipping_tax: '',
    total_price: '',
    total_tax: '',
    tax_lines: block_data_1.EMPTY_TAX_LINES,
    currency_code: '',
    currency_symbol: '',
    currency_minor_unit: 2,
    currency_decimal_separator: '',
    currency_thousand_separator: '',
    currency_prefix: '',
    currency_suffix: '',
};
var decodeValues = function (object) {
    return (0, base_utils_1.fromEntriesPolyfill)(Object.entries(object).map(function (_a) {
        var key = _a[0], value = _a[1];
        return [
            key,
            (0, html_entities_1.decodeEntities)(value),
        ];
    }));
};
/**
 * @constant
 * @type  {StoreCart} Object containing cart data.
 */
exports.defaultCartData = {
    cartCoupons: block_data_1.EMPTY_CART_COUPONS,
    cartItems: block_data_1.EMPTY_CART_ITEMS,
    cartFees: block_data_1.EMPTY_CART_FEES,
    cartItemsCount: 0,
    cartItemsWeight: 0,
    cartNeedsPayment: true,
    cartNeedsShipping: true,
    cartItemErrors: block_data_1.EMPTY_CART_ITEM_ERRORS,
    cartTotals: defaultCartTotals,
    cartIsLoading: true,
    cartErrors: block_data_1.EMPTY_CART_ERRORS,
    billingAddress: defaultBillingAddress,
    shippingAddress: defaultShippingAddress,
    shippingRates: block_data_1.EMPTY_SHIPPING_RATES,
    shippingRatesLoading: false,
    cartHasCalculatedShipping: false,
    paymentRequirements: block_data_1.EMPTY_PAYMENT_REQUIREMENTS,
    receiveCart: function () { return undefined; },
    extensions: block_data_1.EMPTY_EXTENSIONS,
};
/**
 * This is a custom hook that is wired up to the `wc/store/cart` data
 * store.
 *
 * @param {Object} options                An object declaring the various
 *                                        collection arguments.
 * @param {boolean} options.shouldSelect  If false, the previous results will be
 *                                        returned and internal selects will not
 *                                        fire.
 *
 * @return {StoreCart} Object containing cart data.
 */
var useStoreCart = function (options) {
    if (options === void 0) { options = { shouldSelect: true }; }
    var _a = (0, editor_context_1.useEditorContext)(), isEditor = _a.isEditor, previewData = _a.previewData;
    var previewCart = previewData === null || previewData === void 0 ? void 0 : previewData.previewCart;
    var shouldSelect = options.shouldSelect;
    var currentResults = (0, element_1.useRef)();
    // This will keep track of jQuery and DOM events triggered by other blocks
    // or components and will invalidate the store resolution accordingly.
    (0, use_store_cart_event_listeners_1.useStoreCartEventListeners)();
    var results = (0, data_1.useSelect)(function (select, _a) {
        var dispatch = _a.dispatch;
        if (!shouldSelect) {
            return exports.defaultCartData;
        }
        if (isEditor) {
            return {
                cartCoupons: previewCart.coupons,
                cartItems: previewCart.items,
                cartFees: previewCart.fees,
                cartItemsCount: previewCart.items_count,
                cartItemsWeight: previewCart.items_weight,
                cartNeedsPayment: previewCart.needs_payment,
                cartNeedsShipping: previewCart.needs_shipping,
                cartItemErrors: block_data_1.EMPTY_CART_ITEM_ERRORS,
                cartTotals: previewCart.totals,
                cartIsLoading: false,
                cartErrors: block_data_1.EMPTY_CART_ERRORS,
                billingAddress: defaultBillingAddress,
                shippingAddress: defaultShippingAddress,
                extensions: block_data_1.EMPTY_EXTENSIONS,
                shippingRates: previewCart.shipping_rates,
                shippingRatesLoading: false,
                cartHasCalculatedShipping: previewCart.has_calculated_shipping,
                paymentRequirements: previewCart.paymentRequirements,
                receiveCart: typeof (previewCart === null || previewCart === void 0 ? void 0 : previewCart.receiveCart) === 'function'
                    ? previewCart.receiveCart
                    : function () { return undefined; },
            };
        }
        var store = select(block_data_1.CART_STORE_KEY);
        var cartData = store.getCartData();
        var cartErrors = store.getCartErrors();
        var cartTotals = store.getCartTotals();
        var cartIsLoading = !store.hasFinishedResolution('getCartData');
        var shippingRatesLoading = store.isCustomerDataUpdating();
        var receiveCart = dispatch(block_data_1.CART_STORE_KEY).receiveCart;
        var billingAddress = decodeValues(cartData.billingAddress);
        var shippingAddress = cartData.needsShipping
            ? decodeValues(cartData.shippingAddress)
            : billingAddress;
        var cartFees = cartData.fees.length > 0
            ? cartData.fees.map(function (fee) {
                return decodeValues(fee);
            })
            : block_data_1.EMPTY_CART_FEES;
        // Add a text property to the coupon to allow extensions to modify
        // the text used to display the coupon, without affecting the
        // functionality when it comes to removing the coupon.
        var cartCoupons = cartData.coupons.length > 0
            ? cartData.coupons.map(function (coupon) { return (__assign(__assign({}, coupon), { label: coupon.code })); })
            : block_data_1.EMPTY_CART_COUPONS;
        return {
            cartCoupons: cartCoupons,
            cartItems: cartData.items,
            cartFees: cartFees,
            cartItemsCount: cartData.itemsCount,
            cartItemsWeight: cartData.itemsWeight,
            cartNeedsPayment: cartData.needsPayment,
            cartNeedsShipping: cartData.needsShipping,
            cartItemErrors: cartData.errors,
            cartTotals: cartTotals,
            cartIsLoading: cartIsLoading,
            cartErrors: cartErrors,
            billingAddress: (0, base_utils_1.emptyHiddenAddressFields)(billingAddress),
            shippingAddress: (0, base_utils_1.emptyHiddenAddressFields)(shippingAddress),
            extensions: cartData.extensions,
            shippingRates: cartData.shippingRates,
            shippingRatesLoading: shippingRatesLoading,
            cartHasCalculatedShipping: cartData.hasCalculatedShipping,
            paymentRequirements: cartData.paymentRequirements,
            receiveCart: receiveCart,
        };
    }, [shouldSelect]);
    if (!currentResults.current ||
        !(0, lodash_1.isEqual)(currentResults.current, results)) {
        currentResults.current = results;
    }
    return currentResults.current;
};
exports.useStoreCart = useStoreCart;
