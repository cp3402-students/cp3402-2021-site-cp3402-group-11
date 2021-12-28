"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var base_utils_1 = require("@woocommerce/base-utils");
var price_format_1 = require("@woocommerce/price-format");
var formatted_monetary_amount_1 = require("@woocommerce/base-components/formatted-monetary-amount");
var base_context_1 = require("@woocommerce/base-context");
var html_entities_1 = require("@wordpress/html-entities");
var wordpress_components_1 = require("wordpress-components");
var classnames_1 = require("classnames");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var no_shipping_placeholder_1 = require("./no-shipping-placeholder");
require("./style.scss");
/**
 * Renders a shipping rate control option.
 *
 * @param {Object} option Shipping Rate.
 */
var renderShippingRatesControlOption = function (option) {
    var priceWithTaxes = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
        ? parseInt(option.price, 10) + parseInt(option.taxes, 10)
        : parseInt(option.price, 10);
    return {
        label: (0, html_entities_1.decodeEntities)(option.name),
        value: option.rate_id,
        description: (0, html_entities_1.decodeEntities)(option.description),
        secondaryLabel: (<formatted_monetary_amount_1.default currency={(0, price_format_1.getCurrencyFromPriceResponse)(option)} value={priceWithTaxes}/>),
        secondaryDescription: (0, html_entities_1.decodeEntities)(option.delivery_time),
    };
};
var Block = function () {
    var isEditor = (0, base_context_1.useEditorContext)().isEditor;
    var _a = (0, base_context_1.useShippingDataContext)(), shippingRates = _a.shippingRates, shippingRatesLoading = _a.shippingRatesLoading, needsShipping = _a.needsShipping, hasCalculatedShipping = _a.hasCalculatedShipping;
    if (!needsShipping) {
        return null;
    }
    var shippingRatesPackageCount = (0, base_utils_1.getShippingRatesPackageCount)(shippingRates);
    if (!isEditor &&
        !hasCalculatedShipping &&
        !shippingRatesPackageCount) {
        return (<p>
				{(0, i18n_1.__)('Shipping options will be displayed here after entering your full shipping address.', 'woo-gutenberg-products-block')}
			</p>);
    }
    return (<>
			{isEditor && !shippingRatesPackageCount ? (<no_shipping_placeholder_1.default />) : (<cart_checkout_1.ShippingRatesControl noResultsMessage={<wordpress_components_1.Notice isDismissible={false} className={(0, classnames_1.default)('wc-block-components-shipping-rates-control__no-results-notice', 'woocommerce-error')}>
							{(0, i18n_1.__)('There are no shipping options available. Please check your shipping address.', 'woo-gutenberg-products-block')}
						</wordpress_components_1.Notice>} renderOption={renderShippingRatesControlOption} shippingRates={shippingRates} shippingRatesLoading={shippingRatesLoading}/>)}
		</>);
};
exports.default = Block;
