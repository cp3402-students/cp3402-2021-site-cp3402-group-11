"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var icons_1 = require("@woocommerce/icons");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var save_1 = require("../save");
/**
 * Holds default config for this collection of blocks.
 * attributes and title are omitted here as these are added on an individual block level.
 */
var sharedConfig = {
    category: 'woocommerce-product-elements',
    keywords: [(0, i18n_1.__)('WooCommerce', 'woo-gutenberg-products-block')],
    icon: {
        src: <icons_1.Icon srcElement={icons_1.grid}/>,
        foreground: '#7f54b3',
    },
    supports: {
        html: false,
    },
    parent: (0, block_settings_1.isExperimentalBuild)()
        ? undefined
        : ['@woocommerce/all-products', '@woocommerce/single-product'],
    save: save_1.default,
    deprecated: [
        {
            attributes: {},
            save: function () {
                return null;
            },
        },
    ],
};
exports.default = sharedConfig;
