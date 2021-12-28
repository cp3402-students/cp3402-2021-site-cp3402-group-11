"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CART_API_ERROR = exports.STORE_KEY = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
exports.STORE_KEY = 'wc/store/cart';
exports.CART_API_ERROR = {
    code: 'cart_api_error',
    message: (0, i18n_1.__)('Unable to get cart data from the API.', 'woo-gutenberg-products-block'),
    data: {
        status: 500,
    },
};
