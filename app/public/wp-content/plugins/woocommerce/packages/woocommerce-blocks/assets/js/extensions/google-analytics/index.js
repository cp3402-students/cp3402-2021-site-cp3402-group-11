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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
var utils_1 = require("./utils");
/**
 * Track customer progress through steps of the checkout. Triggers the event when the step changes:
 * 	1 - Contact information
 * 	2 - Shipping address
 * 	3 - Billing address
 * 	4 - Shipping options
 * 	5 - Payment options
 *
 * @summary Track checkout progress with begin_checkout and checkout_progress
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#1_measure_checkout_steps
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-render-checkout-form", constants_1.namespace, (0, utils_1.trackCheckoutStep)(0));
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-email-address", constants_1.namespace, (0, utils_1.trackCheckoutStep)(1));
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-shipping-address", constants_1.namespace, (0, utils_1.trackCheckoutStep)(2));
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-billing-address", constants_1.namespace, (0, utils_1.trackCheckoutStep)(3));
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-phone-number", constants_1.namespace, function (_a) {
    var step = _a.step, rest = __rest(_a, ["step"]);
    (0, utils_1.trackCheckoutStep)(step === 'shipping' ? 2 : 3)(rest);
});
/**
 * Choose a shipping rate
 *
 * @summary Track the shipping rate being set using set_checkout_option
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#2_measure_checkout_options
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-selected-shipping-rate", constants_1.namespace, function (_a) {
    var shippingRateId = _a.shippingRateId;
    (0, utils_1.trackCheckoutOption)({
        step: 4,
        option: (0, i18n_1.__)('Shipping Method', 'woo-gutenberg-products-block'),
        value: shippingRateId,
    })();
});
/**
 * Choose a payment method
 *
 * @summary Track the payment method being set using set_checkout_option
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#2_measure_checkout_options
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-set-active-payment-method", constants_1.namespace, function (_a) {
    var paymentMethodSlug = _a.paymentMethodSlug;
    (0, utils_1.trackCheckoutOption)({
        step: 5,
        option: (0, i18n_1.__)('Payment Method', 'woo-gutenberg-products-block'),
        value: paymentMethodSlug,
    })();
});
/**
 * Add Payment Information
 *
 * This event signifies a user has submitted their payment information. Note, this is used to indicate checkout
 * submission, not `purchase` which is triggered on the thanks page.
 *
 * @summary Track the add_payment_info event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_payment_info
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-checkout-submit", constants_1.namespace, function () {
    (0, utils_1.trackEvent)('add_payment_info');
});
/**
 * Add to cart.
 *
 * This event signifies that an item was added to a cart for purchase.
 *
 * @summary Track the add_to_cart event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#add_to_cart
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-cart-add-item", constants_1.namespace, function (_a) {
    var product = _a.product, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
    (0, utils_1.trackEvent)('add_to_cart', {
        event_category: 'ecommerce',
        event_label: (0, i18n_1.__)('Add to Cart', 'woo-gutenberg-products-block'),
        items: [(0, utils_1.getProductFieldObject)(product, quantity)],
    });
});
/**
 * Remove item from the cart
 *
 * @summary Track the remove_from_cart event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#remove_from_cart
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-cart-remove-item", constants_1.namespace, function (_a) {
    var product = _a.product, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
    (0, utils_1.trackEvent)('remove_from_cart', {
        event_category: 'ecommerce',
        event_label: (0, i18n_1.__)('Remove Cart Item', 'woo-gutenberg-products-block'),
        items: [(0, utils_1.getProductFieldObject)(product, quantity)],
    });
});
/**
 * Change cart item quantities
 *
 * @summary Custom change_cart_quantity event.
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-cart-set-item-quantity", constants_1.namespace, function (_a) {
    var product = _a.product, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b;
    (0, utils_1.trackEvent)('change_cart_quantity', {
        event_category: 'ecommerce',
        event_label: (0, i18n_1.__)('Change Cart Item Quantity', 'woo-gutenberg-products-block'),
        items: [(0, utils_1.getProductFieldObject)(product, quantity)],
    });
});
/**
 * Product List View
 *
 * @summary Track the view_item_list event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#view_item_list
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-product-list-render", constants_1.namespace, function (_a) {
    var products = _a.products, _b = _a.listName, listName = _b === void 0 ? (0, i18n_1.__)('Product List', 'woo-gutenberg-products-block') : _b;
    if (products.length === 0) {
        return;
    }
    (0, utils_1.trackEvent)('view_item_list', {
        event_category: 'engagement',
        event_label: (0, i18n_1.__)('Viewing products', 'woo-gutenberg-products-block'),
        items: products.map(function (product, index) { return (__assign(__assign({}, (0, utils_1.getProductImpressionObject)(product, listName)), { list_position: index + 1 })); }),
    });
});
/**
 * Product View Link Clicked
 *
 * @summary Track the select_content event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#select_content
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-product-view-link", constants_1.namespace, function (_a) {
    var product = _a.product, listName = _a.listName;
    (0, utils_1.trackEvent)('select_content', {
        content_type: 'product',
        items: [(0, utils_1.getProductImpressionObject)(product, listName)],
    });
});
/**
 * Product Search
 *
 * @summary Track the search event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#search
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-product-search", constants_1.namespace, function (_a) {
    var searchTerm = _a.searchTerm;
    (0, utils_1.trackEvent)('search', {
        search_term: searchTerm,
    });
});
/**
 * Single Product View
 *
 * @summary Track the view_item event
 * @see https://developers.google.com/gtagjs/reference/ga4-events#view_item
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-product-render", constants_1.namespace, function (_a) {
    var product = _a.product, listName = _a.listName;
    if (product) {
        (0, utils_1.trackEvent)('view_item', {
            items: [(0, utils_1.getProductImpressionObject)(product, listName)],
        });
    }
});
/**
 * Track notices as Exception events.
 *
 * @summary Track the exception event
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
 */
(0, hooks_1.addAction)(constants_1.actionPrefix + "-store-notice-create", constants_1.namespace, function (_a) {
    var status = _a.status, content = _a.content;
    if (status === 'error') {
        (0, utils_1.trackEvent)('exception', {
            description: content,
            fatal: false,
        });
    }
});
