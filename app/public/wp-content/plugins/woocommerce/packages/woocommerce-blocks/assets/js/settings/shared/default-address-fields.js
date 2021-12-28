"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAddressFields = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
/**
 * Default address field properties.
 */
exports.defaultAddressFields = {
    first_name: {
        label: (0, i18n_1.__)('First name', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('First name (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'given-name',
        autocapitalize: 'sentences',
        required: true,
        hidden: false,
        index: 10,
    },
    last_name: {
        label: (0, i18n_1.__)('Last name', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Last name (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'family-name',
        autocapitalize: 'sentences',
        required: true,
        hidden: false,
        index: 20,
    },
    company: {
        label: (0, i18n_1.__)('Company', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Company (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'organization',
        autocapitalize: 'sentences',
        required: false,
        hidden: false,
        index: 30,
    },
    address_1: {
        label: (0, i18n_1.__)('Address', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Address (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'address-line1',
        autocapitalize: 'sentences',
        required: true,
        hidden: false,
        index: 40,
    },
    address_2: {
        label: (0, i18n_1.__)('Apartment, suite, etc.', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Apartment, suite, etc. (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'address-line2',
        autocapitalize: 'sentences',
        required: false,
        hidden: false,
        index: 50,
    },
    country: {
        label: (0, i18n_1.__)('Country/Region', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Country/Region (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'country',
        required: true,
        hidden: false,
        index: 60,
    },
    city: {
        label: (0, i18n_1.__)('City', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('City (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'address-level2',
        autocapitalize: 'sentences',
        required: true,
        hidden: false,
        index: 70,
    },
    state: {
        label: (0, i18n_1.__)('State/County', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('State/County (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'address-level1',
        autocapitalize: 'sentences',
        required: true,
        hidden: false,
        index: 80,
    },
    postcode: {
        label: (0, i18n_1.__)('Postal code', 'woo-gutenberg-products-block'),
        optionalLabel: (0, i18n_1.__)('Postal code (optional)', 'woo-gutenberg-products-block'),
        autocomplete: 'postal-code',
        autocapitalize: 'characters',
        required: true,
        hidden: false,
        index: 90,
    },
};
exports.default = exports.defaultAddressFields;
