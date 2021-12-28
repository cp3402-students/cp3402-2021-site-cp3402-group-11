"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var block_settings_1 = require("@woocommerce/block-settings");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
// Modify webpack publicPath at runtime based on location of WordPress Plugin.
// eslint-disable-next-line no-undef,camelcase
__webpack_public_path__ = block_settings_1.WC_BLOCKS_BUILD_URL;
/**
 * Internal dependencies
 */
var block_json_1 = require("./filled-cart-block/block.json");
var block_json_2 = require("./empty-cart-block/block.json");
var block_json_3 = require("./cart-items-block/block.json");
var block_json_4 = require("./cart-express-payment-block/block.json");
var block_json_5 = require("./cart-line-items-block/block.json");
var block_json_6 = require("./cart-order-summary-block/block.json");
var block_json_7 = require("./cart-totals-block/block.json");
var block_json_8 = require("./proceed-to-checkout-block/block.json");
var block_json_9 = require("./cart-accepted-payment-methods-block/block.json");
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_1.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/filled-cart" */ './filled-cart-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_2.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/empty-cart" */ './empty-cart-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_1.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/filled-cart" */ './filled-cart-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_2.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/empty-cart" */ './empty-cart-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_3.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/items" */ './cart-items-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_5.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/line-items" */ './cart-line-items-block/block'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_7.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/totals" */ './cart-totals-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_6.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/order-summary" */ './cart-order-summary-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_4.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/express-payment" */ './cart-express-payment-block/block'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_8.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/checkout-button" */ './proceed-to-checkout-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_9.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "cart-blocks/accepted-payment-methods" */ './cart-accepted-payment-methods-block/frontend'); });
    }),
});
