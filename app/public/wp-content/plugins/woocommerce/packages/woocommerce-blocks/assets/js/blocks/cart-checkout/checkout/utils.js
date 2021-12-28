"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadPage = exports.isLoginRequired = exports.LOGIN_TO_CHECKOUT_URL = void 0;
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
var settings_1 = require("@woocommerce/settings");
exports.LOGIN_TO_CHECKOUT_URL = block_settings_1.LOGIN_URL + "?redirect_to=" + encodeURIComponent(window.location.href);
var isLoginRequired = function (customerId) {
    return !customerId && !(0, settings_1.getSetting)('checkoutAllowsGuest', false);
};
exports.isLoginRequired = isLoginRequired;
var reloadPage = function () { return void window.location.reload(true); };
exports.reloadPage = reloadPage;
