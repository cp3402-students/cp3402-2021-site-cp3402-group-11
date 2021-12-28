"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var item_1 = require("../item");
var Subtotal = function (_a) {
    var currency = _a.currency, values = _a.values, className = _a.className;
    var totalItems = values.total_items, totalItemsTax = values.total_items_tax;
    var itemsValue = parseInt(totalItems, 10);
    var itemsTaxValue = parseInt(totalItemsTax, 10);
    return (<item_1.default className={className} currency={currency} label={(0, i18n_1.__)('Subtotal', 'woo-gutenberg-products-block')} value={(0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
            ? itemsValue + itemsTaxValue
            : itemsValue}/>);
};
exports.default = Subtotal;
