"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var item_1 = require("../item");
require("./style.scss");
var TotalsTaxes = function (_a) {
    var currency = _a.currency, values = _a.values, className = _a.className, showRateAfterTaxName = _a.showRateAfterTaxName;
    var totalTax = values.total_tax, taxLines = values.tax_lines;
    if (!(0, settings_1.getSetting)('taxesEnabled', true) &&
        parseInt(totalTax, 10) <= 0) {
        return null;
    }
    var showItemisedTaxes = (0, settings_1.getSetting)('displayItemizedTaxes', false);
    var itemisedTaxItems = showItemisedTaxes && taxLines.length > 0 ? (<div className={(0, classnames_1.default)('wc-block-components-totals-taxes', className)}>
				{taxLines.map(function (_a, i) {
            var name = _a.name, rate = _a.rate, price = _a.price;
            var label = "" + name + (showRateAfterTaxName ? " " + rate : '');
            return (<item_1.default key={"tax-line-" + i} className="wc-block-components-totals-taxes__grouped-rate" currency={currency} label={label} value={parseInt(price, 10)}/>);
        })}{' '}
			</div>) : null;
    return showItemisedTaxes ? (itemisedTaxItems) : (<>
			<item_1.default className={(0, classnames_1.default)('wc-block-components-totals-taxes', className)} currency={currency} label={(0, i18n_1.__)('Taxes', 'woo-gutenberg-products-block')} value={parseInt(totalTax, 10)} description={null}/>
		</>);
};
exports.default = TotalsTaxes;
