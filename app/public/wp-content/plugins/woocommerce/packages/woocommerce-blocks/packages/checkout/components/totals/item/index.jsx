"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
var formatted_monetary_amount_1 = require("@woocommerce/base-components/formatted-monetary-amount");
/**
 * Internal dependencies
 */
require("./style.scss");
var TotalsItemValue = function (_a) {
    var value = _a.value, currency = _a.currency;
    if ((0, element_1.isValidElement)(value)) {
        return (<div className="wc-block-components-totals-item__value">
				{value}
			</div>);
    }
    return Number.isFinite(value) ? (<formatted_monetary_amount_1.default className="wc-block-components-totals-item__value" currency={currency || {}} value={value}/>) : null;
};
var TotalsItem = function (_a) {
    var className = _a.className, currency = _a.currency, label = _a.label, value = _a.value, description = _a.description;
    return (<div className={(0, classnames_1.default)('wc-block-components-totals-item', className)}>
			<span className="wc-block-components-totals-item__label">
				{label}
			</span>
			<TotalsItemValue value={value} currency={currency}/>
			<div className="wc-block-components-totals-item__description">
				{description}
			</div>
		</div>);
};
exports.default = TotalsItem;
