"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPackageRateOption = void 0;
/**
 * External dependencies
 */
var html_entities_1 = require("@wordpress/html-entities");
var price_format_1 = require("@woocommerce/price-format");
var formatted_monetary_amount_1 = require("@woocommerce/base-components/formatted-monetary-amount");
var settings_1 = require("@woocommerce/settings");
/**
 * Default render function for package rate options.
 *
 * @param {Object} rate Rate data.
 */
var renderPackageRateOption = function (rate) {
    var priceWithTaxes = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
        ? parseInt(rate.price, 10) + parseInt(rate.taxes, 10)
        : parseInt(rate.price, 10);
    return {
        label: (0, html_entities_1.decodeEntities)(rate.name),
        value: rate.rate_id,
        description: (<>
				{Number.isFinite(priceWithTaxes) && (<formatted_monetary_amount_1.default currency={(0, price_format_1.getCurrencyFromPriceResponse)(rate)} value={priceWithTaxes}/>)}
				{Number.isFinite(priceWithTaxes) && rate.delivery_time
                ? ' — '
                : null}
				{(0, html_entities_1.decodeEntities)(rate.delivery_time)}
			</>),
    };
};
exports.renderPackageRateOption = renderPackageRateOption;
exports.default = exports.renderPackageRateOption;
