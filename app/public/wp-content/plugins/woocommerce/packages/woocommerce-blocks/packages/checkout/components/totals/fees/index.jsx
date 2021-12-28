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
var TotalsFees = function (_a) {
    var currency = _a.currency, cartFees = _a.cartFees, className = _a.className;
    return (<>
			{cartFees.map(function (_a, index) {
            var id = _a.id, name = _a.name, totals = _a.totals;
            var feesValue = parseInt(totals.total, 10);
            if (!feesValue) {
                return null;
            }
            var feesTaxValue = parseInt(totals.total_tax, 10);
            return (<item_1.default key={id || index + "-" + name} className={(0, classnames_1.default)('wc-block-components-totals-fees', className)} currency={currency} label={name || (0, i18n_1.__)('Fee', 'woo-gutenberg-products-block')} value={(0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
                    ? feesValue + feesTaxValue
                    : feesValue}/>);
        })}
		</>);
};
exports.default = TotalsFees;
