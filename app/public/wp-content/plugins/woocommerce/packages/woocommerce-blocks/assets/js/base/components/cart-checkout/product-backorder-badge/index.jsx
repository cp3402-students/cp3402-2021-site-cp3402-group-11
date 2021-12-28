"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
var product_badge_1 = require("../product-badge");
/**
 * Returns a backorder badge.
 */
var ProductBackorderBadge = function () {
    return (<product_badge_1.default className="wc-block-components-product-backorder-badge">
			{(0, i18n_1.__)('Available on backorder', 'woo-gutenberg-products-block')}
		</product_badge_1.default>);
};
exports.default = ProductBackorderBadge;
