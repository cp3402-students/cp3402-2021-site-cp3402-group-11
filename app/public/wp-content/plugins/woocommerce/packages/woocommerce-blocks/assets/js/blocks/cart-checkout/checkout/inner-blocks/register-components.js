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
var block_json_1 = require("./checkout-actions-block/block.json");
var block_json_2 = require("./checkout-billing-address-block/block.json");
var block_json_3 = require("./checkout-contact-information-block/block.json");
var block_json_4 = require("./checkout-express-payment-block/block.json");
var block_json_5 = require("./checkout-fields-block/block.json");
var block_json_6 = require("./checkout-order-note-block/block.json");
var block_json_7 = require("./checkout-order-summary-block/block.json");
var block_json_8 = require("./checkout-payment-block/block.json");
var block_json_9 = require("./checkout-shipping-address-block/block.json");
var block_json_10 = require("./checkout-shipping-methods-block/block.json");
var block_json_11 = require("./checkout-terms-block/block.json");
var block_json_12 = require("./checkout-totals-block/block.json");
// @todo When forcing all blocks at once, they will append based on the order they are registered. Introduce formal sorting param.
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_5.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/fields" */ './checkout-fields-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_4.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/express-payment" */ './checkout-express-payment-block/block'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_3.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/contact-information" */ './checkout-contact-information-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_9.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/shipping-address" */ './checkout-shipping-address-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_2.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/billing-address" */ './checkout-billing-address-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_10.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/shipping-methods" */ './checkout-shipping-methods-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_8.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/payment" */ './checkout-payment-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_6.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/order-note" */ './checkout-order-note-block/block'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_11.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/terms" */ './checkout-terms-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_1.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/actions" */ './checkout-actions-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_12.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/totals" */ './checkout-totals-block/frontend'); });
    }),
});
(0, blocks_checkout_1.registerCheckoutBlock)({
    metadata: block_json_7.default,
    component: (0, element_1.lazy)(function () {
        return Promise.resolve().then(function () { return require(
        /* webpackChunkName: "checkout-blocks/order-summary" */ './checkout-order-summary-block/block'); });
    }),
});
