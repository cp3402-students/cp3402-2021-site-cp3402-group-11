"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingVia = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var html_entities_1 = require("@wordpress/html-entities");
var ShippingVia = function (_a) {
    var selectedShippingRates = _a.selectedShippingRates;
    return (<div className="wc-block-components-totals-item__description wc-block-components-totals-shipping__via">
			{(0, i18n_1.__)('via', 'woo-gutenberg-products-block')}{' '}
			{(0, html_entities_1.decodeEntities)(selectedShippingRates.join(', '))}
		</div>);
};
exports.ShippingVia = ShippingVia;
