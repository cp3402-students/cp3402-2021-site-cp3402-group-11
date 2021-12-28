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
 * Returns a low stock badge.
 *
 * @param {Object}  props                   Incoming props for the component.
 * @param {number} props.lowStockRemaining Whether or not there is low stock remaining.
 */
var ProductLowStockBadge = function (_a) {
    var lowStockRemaining = _a.lowStockRemaining;
    if (!lowStockRemaining) {
        return null;
    }
    return (<product_badge_1.default className="wc-block-components-product-low-stock-badge">
			{(0, i18n_1.sprintf)(
        /* translators: %d stock amount (number of items in stock for product) */
        (0, i18n_1.__)('%d left in stock', 'woo-gutenberg-products-block'), lowStockRemaining)}
		</product_badge_1.default>);
};
exports.default = ProductLowStockBadge;
