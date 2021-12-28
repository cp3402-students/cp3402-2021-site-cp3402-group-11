"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
var cart_line_items_table_1 = require("../../cart-line-items-table");
var Block = function (_a) {
    var className = _a.className;
    var _b = (0, hooks_1.useStoreCart)(), cartItems = _b.cartItems, cartIsLoading = _b.cartIsLoading;
    return (<cart_line_items_table_1.default className={className} lineItems={cartItems} isLoading={cartIsLoading}/>);
};
exports.default = Block;
