"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionCartUpdate = void 0;
/**
 * External dependencies
 */
var data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
var constants_1 = require("../../../assets/js/data/cart/constants");
/**
 * When executed, this will call the cart/extensions endpoint.
 * The args contains a namespace, so if that extension has registered an update
 * callback, it will be executed server-side and the new cart will be returned.
 * The new cart is then received into the client-side store.
 */
var extensionCartUpdate = function (args) {
    var applyExtensionCartUpdate = (0, data_1.dispatch)(constants_1.STORE_KEY).applyExtensionCartUpdate;
    return applyExtensionCartUpdate(args);
};
exports.extensionCartUpdate = extensionCartUpdate;
