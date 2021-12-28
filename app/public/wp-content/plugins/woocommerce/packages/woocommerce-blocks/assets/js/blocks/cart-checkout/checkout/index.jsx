"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var icons_1 = require("@woocommerce/icons");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var edit_1 = require("./edit");
var attributes_1 = require("./attributes");
require("./inner-blocks");
var settings = {
    title: (0, i18n_1.__)('Checkout', 'woo-gutenberg-products-block'),
    icon: {
        src: <icons_1.Icon srcElement={icons_1.fields}/>,
        foreground: '#7f54b3',
    },
    category: 'woocommerce',
    keywords: [(0, i18n_1.__)('WooCommerce', 'woo-gutenberg-products-block')],
    description: (0, i18n_1.__)('Display a checkout form so your customers can submit orders.', 'woo-gutenberg-products-block'),
    supports: {
        align: ['wide', 'full'],
        html: false,
        multiple: false,
    },
    attributes: attributes_1.blockAttributes,
    apiVersion: 2,
    edit: edit_1.Edit,
    save: edit_1.Save,
    // Migrates v1 to v2 checkout.
    deprecated: [
        {
            attributes: attributes_1.blockAttributes,
            save: function (_a) {
                var attributes = _a.attributes;
                return (<div className={(0, classnames_1.default)('is-loading', attributes.className)}/>);
            },
        },
    ],
};
(0, block_settings_1.registerFeaturePluginBlockType)(attributes_1.blockName, settings);
