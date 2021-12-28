"use strict";
/** @typedef { import('@woocommerce/type-defs/address-fields').CountryAddressFields } CountryAddressFields */
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
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
var i18n_1 = require("@wordpress/i18n");
var types_1 = require("@woocommerce/types");
/**
 * This is locale data from WooCommerce countries class. This doesn't match the shape of the new field data blocks uses,
 * but we can import part of it to set which fields are required.
 *
 * This supports new properties such as optionalLabel which are not used by core (yet).
 */
var coreLocale = (0, settings_1.getSetting)('countryLocale', {});
/**
 * Gets props from the core locale, then maps them to the shape we require in the client.
 *
 * Ignores "class", "type", "placeholder", and "autocomplete" props from core.
 *
 * @param {Object} localeField Locale fields from WooCommerce.
 * @return {Object} Supported locale fields.
 */
var getSupportedCoreLocaleProps = function (localeField) {
    var fields = {};
    if (localeField.label !== undefined) {
        fields.label = localeField.label;
    }
    if (localeField.required !== undefined) {
        fields.required = localeField.required;
    }
    if (localeField.hidden !== undefined) {
        fields.hidden = localeField.hidden;
    }
    if (localeField.label !== undefined && !localeField.optionalLabel) {
        fields.optionalLabel = (0, i18n_1.sprintf)(
        /* translators: %s Field label. */
        (0, i18n_1.__)('%s (optional)', 'woo-gutenberg-products-block'), localeField.label);
    }
    if (localeField.priority) {
        if ((0, types_1.isNumber)(localeField.priority)) {
            fields.index = localeField.priority;
        }
        if ((0, types_1.isString)(localeField.priority)) {
            fields.index = parseInt(localeField.priority, 10);
        }
    }
    if (localeField.hidden) {
        fields.required = false;
    }
    return fields;
};
var countryAddressFields = Object.entries(coreLocale)
    .map(function (_a) {
    var country = _a[0], countryLocale = _a[1];
    return [
        country,
        Object.entries(countryLocale)
            .map(function (_a) {
            var localeFieldKey = _a[0], localeField = _a[1];
            return [
                localeFieldKey,
                getSupportedCoreLocaleProps(localeField),
            ];
        })
            .reduce(function (obj, _a) {
            var key = _a[0], val = _a[1];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - Ignoring because it should be fine as long as the data from the server is correct. TS won't catch it anyway if it's not.
            obj[key] = val;
            return obj;
        }, {}),
    ];
})
    .reduce(function (obj, _a) {
    var key = _a[0], val = _a[1];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Ignoring because it should be fine as long as the data from the server is correct. TS won't catch it anyway if it's not.
    obj[key] = val;
    return obj;
}, {});
/**
 * Combines address fields, including fields from the locale, and sorts them by index.
 *
 * @param {Array} fields List of field keys--only address fields matching these will be returned.
 * @param {Object} fieldConfigs Fields config contains field specific overrides at block level which may, for example, hide a field.
 * @param {string} addressCountry Address country code. If unknown, locale fields will not be merged.
 * @return {CountryAddressFields} Object containing address fields.
 */
var prepareAddressFields = function (fields, fieldConfigs, addressCountry) {
    if (addressCountry === void 0) { addressCountry = ''; }
    var localeConfigs = addressCountry && countryAddressFields[addressCountry] !== undefined
        ? countryAddressFields[addressCountry]
        : {};
    return fields
        .map(function (field) {
        var defaultConfig = settings_1.defaultAddressFields[field] || {};
        var localeConfig = localeConfigs[field] || {};
        var fieldConfig = fieldConfigs[field] || {};
        return __assign(__assign(__assign({ key: field }, defaultConfig), localeConfig), fieldConfig);
    })
        .sort(function (a, b) { return a.index - b.index; });
};
exports.default = prepareAddressFields;
