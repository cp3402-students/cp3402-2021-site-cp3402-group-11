"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var react_number_format_1 = require("react-number-format");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Formats currency data into the expected format for NumberFormat.
 */
var currencyToNumberFormat = function (currency) {
    return {
        thousandSeparator: currency.thousandSeparator,
        decimalSeparator: currency.decimalSeparator,
        decimalScale: currency.minorUnit,
        fixedDecimalScale: true,
        prefix: currency.prefix,
        suffix: currency.suffix,
        isNumericString: true,
    };
};
/**
 * FormattedMonetaryAmount component.
 *
 * Takes a price and returns a formatted price using the NumberFormat component.
 */
var FormattedMonetaryAmount = function (_a) {
    var className = _a.className, rawValue = _a.value, currency = _a.currency, onValueChange = _a.onValueChange, _b = _a.displayType, displayType = _b === void 0 ? 'text' : _b, props = __rest(_a, ["className", "value", "currency", "onValueChange", "displayType"]);
    var value = typeof rawValue === 'string' ? parseInt(rawValue, 10) : rawValue;
    if (!Number.isFinite(value)) {
        return null;
    }
    var priceValue = value / Math.pow(10, currency.minorUnit);
    if (!Number.isFinite(priceValue)) {
        return null;
    }
    var classes = (0, classnames_1.default)('wc-block-formatted-money-amount', 'wc-block-components-formatted-money-amount', className);
    var numberFormatProps = __assign(__assign(__assign({}, props), currencyToNumberFormat(currency)), { value: undefined, currency: undefined, onValueChange: undefined });
    // Wrapper for NumberFormat onValueChange which handles subunit conversion.
    var onValueChangeWrapper = onValueChange
        ? function (values) {
            var minorUnitValue = values.value *
                Math.pow(10, currency.minorUnit);
            onValueChange(minorUnitValue);
        }
        : function () {
            /* not used */
        };
    return (<react_number_format_1.default className={classes} displayType={displayType} {...numberFormatProps} value={priceValue} onValueChange={onValueChangeWrapper}/>);
};
exports.default = FormattedMonetaryAmount;
