"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var settings_1 = require("@woocommerce/settings");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Shows a formatted shipping location.
 *
 * @param {Object} props Incoming props for the component.
 * @param {Object} props.address Incoming address information.
 */
var ShippingLocation = function (_a) {
    var address = _a.address;
    // we bail early if we don't have an address.
    if (Object.values(address).length === 0) {
        return null;
    }
    var shippingCountries = (0, settings_1.getSetting)('shippingCountries', {});
    var shippingStates = (0, settings_1.getSetting)('shippingStates', {});
    var formattedCountry = typeof shippingCountries[address.country] === 'string'
        ? (0, html_entities_1.decodeEntities)(shippingCountries[address.country])
        : '';
    var formattedState = typeof shippingStates[address.country] === 'object' &&
        typeof shippingStates[address.country][address.state] === 'string'
        ? (0, html_entities_1.decodeEntities)(shippingStates[address.country][address.state])
        : address.state;
    var addressParts = [];
    addressParts.push(address.postcode.toUpperCase());
    addressParts.push(address.city);
    addressParts.push(formattedState);
    addressParts.push(formattedCountry);
    var formattedLocation = addressParts.filter(Boolean).join(', ');
    if (!formattedLocation) {
        return null;
    }
    return (<span className="wc-block-components-shipping-address">
			{(0, i18n_1.sprintf)(
        /* translators: %s location. */
        (0, i18n_1.__)('Shipping to %s', 'woo-gutenberg-products-block'), formattedLocation) + ' '}
		</span>);
};
exports.default = ShippingLocation;
