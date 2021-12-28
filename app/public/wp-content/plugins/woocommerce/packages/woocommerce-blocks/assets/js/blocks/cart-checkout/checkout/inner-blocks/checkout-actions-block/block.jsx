"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var settings_1 = require("@woocommerce/settings");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
/**
 * Internal dependencies
 */
require("./style.scss");
var Block = function (_a) {
    var cartPageId = _a.cartPageId, showReturnToCart = _a.showReturnToCart, className = _a.className;
    return (<div className={(0, classnames_1.default)('wc-block-checkout__actions', className)}>
			{showReturnToCart && (<cart_checkout_1.ReturnToCartButton link={(0, settings_1.getSetting)('page-' + cartPageId, false)}/>)}
			<cart_checkout_1.PlaceOrderButton />
		</div>);
};
exports.default = Block;
