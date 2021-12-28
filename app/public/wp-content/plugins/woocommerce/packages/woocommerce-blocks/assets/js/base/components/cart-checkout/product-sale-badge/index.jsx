"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var i18n_1 = require("@wordpress/i18n");
var formatted_monetary_amount_1 = require("@woocommerce/base-components/formatted-monetary-amount");
/**
 * Internal dependencies
 */
var product_badge_1 = require("../product-badge");
/**
 * ProductSaleBadge
 *
 * @param {Object} props            Incoming props.
 * @param {Object} props.currency   Currency object.
 * @param {number} props.saleAmount Discounted amount.
 * @param {string} [props.format]   Format to change the price.
 * @return {*} The component.
 */
var ProductSaleBadge = function (_a) {
    var currency = _a.currency, saleAmount = _a.saleAmount, _b = _a.format, format = _b === void 0 ? '<price/>' : _b;
    if (!saleAmount || saleAmount <= 0) {
        return null;
    }
    if (!format.includes('<price/>')) {
        format = '<price/>';
        // eslint-disable-next-line no-console
        console.error('Price formats need to include the `<price/>` tag.');
    }
    var formattedMessage = (0, i18n_1.sprintf)(
    /* translators: %s will be replaced by the discount amount */
    (0, i18n_1.__)("Save %s", 'woo-gutenberg-products-block'), format);
    return (<product_badge_1.default className="wc-block-components-sale-badge">
			{(0, element_1.createInterpolateElement)(formattedMessage, {
            price: (<formatted_monetary_amount_1.default currency={currency} value={saleAmount}/>),
        })}
		</product_badge_1.default>);
};
exports.default = ProductSaleBadge;
