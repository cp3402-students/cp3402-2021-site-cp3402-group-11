"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyHiddenAddressFields = exports.pluckEmail = exports.pluckAddress = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
var prepare_address_fields_1 = require("@woocommerce/base-components/cart-checkout/address-form/prepare-address-fields");
var url_1 = require("@wordpress/url");
/**
 * pluckAddress takes a full address object and returns relevant fields for calculating
 * shipping, so we can track when one of them change to update rates.
 *
 * @param {Object} address          An object containing all address information
 * @param {string} address.country  The country.
 * @param {string} address.state    The state.
 * @param {string} address.city     The city.
 * @param {string} address.postcode The postal code.
 *
 * @return {Object} pluckedAddress  An object containing shipping address that are needed to fetch an address.
 */
var pluckAddress = function (_a) {
    var _b = _a.country, country = _b === void 0 ? '' : _b, _c = _a.state, state = _c === void 0 ? '' : _c, _d = _a.city, city = _d === void 0 ? '' : _d, _e = _a.postcode, postcode = _e === void 0 ? '' : _e;
    return ({
        country: country.trim(),
        state: state.trim(),
        city: city.trim(),
        postcode: postcode ? postcode.replace(' ', '').toUpperCase() : '',
    });
};
exports.pluckAddress = pluckAddress;
/**
 * pluckEmail takes a full address object and returns only the email address, if set and valid. Otherwise returns an empty string.
 *
 * @param {Object} address       An object containing all address information
 * @param {string} address.email The email address.
 * @return {string} The email address.
 */
var pluckEmail = function (_a) {
    var _b = _a.email, email = _b === void 0 ? '' : _b;
    return (0, url_1.isEmail)(email) ? email.trim() : '';
};
exports.pluckEmail = pluckEmail;
/**
 * Type-guard.
 */
var isValidAddressKey = function (key, address) {
    return key in address;
};
/**
 * Sets fields to an empty string in an address if they are hidden by the settings in countryLocale.
 *
 * @param {Object} address The address to empty fields from.
 * @return {Object} The address with hidden fields values removed.
 */
var emptyHiddenAddressFields = function (address) {
    var fields = Object.keys(settings_1.defaultAddressFields);
    var addressFields = (0, prepare_address_fields_1.default)(fields, {}, address.country);
    var newAddress = Object.assign({}, address);
    addressFields.forEach(function (_a) {
        var _b = _a.key, key = _b === void 0 ? '' : _b, _c = _a.hidden, hidden = _c === void 0 ? false : _c;
        if (hidden && isValidAddressKey(key, address)) {
            newAddress[key] = '';
        }
    });
    return newAddress;
};
exports.emptyHiddenAddressFields = emptyHiddenAddressFields;
