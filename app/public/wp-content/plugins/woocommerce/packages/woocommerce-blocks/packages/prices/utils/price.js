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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.getCurrency = exports.getCurrencyFromPriceResponse = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
/**
 * Get currency prefix.
 */
var getPrefix = function (
// Currency symbol.
symbol, 
// Position of currency symbol from settings.
symbolPosition) {
    var prefixes = {
        left: symbol,
        left_space: ' ' + symbol,
        right: '',
        right_space: '',
    };
    return prefixes[symbolPosition] || '';
};
/**
 * Get currency suffix.
 */
var getSuffix = function (
// Currency symbol.
symbol, 
// Position of currency symbol from settings.
symbolPosition) {
    var suffixes = {
        left: '',
        left_space: '',
        right: symbol,
        right_space: ' ' + symbol,
    };
    return suffixes[symbolPosition] || '';
};
/**
 * Currency information in normalized format from server settings.
 */
var siteCurrencySettings = {
    code: settings_1.CURRENCY.code,
    symbol: settings_1.CURRENCY.symbol,
    thousandSeparator: settings_1.CURRENCY.thousandSeparator,
    decimalSeparator: settings_1.CURRENCY.decimalSeparator,
    minorUnit: settings_1.CURRENCY.precision,
    prefix: getPrefix(settings_1.CURRENCY.symbol, settings_1.CURRENCY.symbolPosition),
    suffix: getSuffix(settings_1.CURRENCY.symbol, settings_1.CURRENCY.symbolPosition),
};
/**
 * Gets currency information in normalized format from an API response or the server.
 */
var getCurrencyFromPriceResponse = function (
// Currency data object, for example an API response containing currency formatting data.
currencyData) {
    if (!currencyData || typeof currencyData !== 'object') {
        return siteCurrencySettings;
    }
    var code = currencyData.currency_code, symbol = currencyData.currency_symbol, thousandSeparator = currencyData.currency_thousand_separator, decimalSeparator = currencyData.currency_decimal_separator, minorUnit = currencyData.currency_minor_unit, prefix = currencyData.currency_prefix, suffix = currencyData.currency_suffix;
    return {
        code: code || 'USD',
        symbol: symbol || '$',
        thousandSeparator: typeof thousandSeparator === 'string' ? thousandSeparator : ',',
        decimalSeparator: typeof decimalSeparator === 'string' ? decimalSeparator : '.',
        minorUnit: Number.isFinite(minorUnit) ? minorUnit : 2,
        prefix: typeof prefix === 'string' ? prefix : '$',
        suffix: typeof suffix === 'string' ? suffix : '',
    };
};
exports.getCurrencyFromPriceResponse = getCurrencyFromPriceResponse;
/**
 * Gets currency information in normalized format, allowing overrides.
 */
var getCurrency = function (currencyData) {
    if (currencyData === void 0) { currencyData = {}; }
    return __assign(__assign({}, siteCurrencySettings), currencyData);
};
exports.getCurrency = getCurrency;
/**
 * Format a price, provided using the smallest unit of the currency, as a
 * decimal complete with currency symbols using current store settings.
 */
var formatPrice = function (
// Price in minor unit, e.g. cents.
price, currencyData) {
    if (price === '' || price === undefined) {
        return '';
    }
    var priceInt = typeof price === 'number' ? price : parseInt(price, 10);
    if (!Number.isFinite(priceInt)) {
        return '';
    }
    var currency = (0, exports.getCurrency)(currencyData);
    var formattedPrice = priceInt / Math.pow(10, currency.minorUnit);
    var formattedValue = currency.prefix + formattedPrice + currency.suffix;
    // This uses a textarea to magically decode HTML currency symbols.
    var txt = document.createElement('textarea');
    txt.innerHTML = formattedValue;
    return txt.value;
};
exports.formatPrice = formatPrice;
