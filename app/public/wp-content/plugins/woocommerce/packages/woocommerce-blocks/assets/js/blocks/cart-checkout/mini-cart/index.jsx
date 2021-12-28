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
var edit_1 = require("./edit");
var settings = {
    apiVersion: 2,
    title: (0, i18n_1.__)('Mini Cart', 'woo-gutenberg-products-block'),
    icon: {
        src: <icons_1.Icon srcElement={icons_1.cart}/>,
        foreground: '#7f54b3',
    },
    category: 'woocommerce',
    keywords: [(0, i18n_1.__)('WooCommerce', 'woo-gutenberg-products-block')],
    description: (0, i18n_1.__)('Display a mini cart widget.', 'woo-gutenberg-products-block'),
    supports: {
        html: false,
        multiple: false,
        color: {
            /**
             * Because we don't target the wrapper element, we don't need
             * to add color classes and style to the wrapper.
             */
            __experimentalSkipSerialization: true,
        },
        /**
         * We need this experimental flag because we don't want to style the
         * wrapper but inner elements.
         */
        __experimentalSelector: '.wc-block-mini-cart__button, .wc-block-mini-cart__badge',
    },
    example: {
        attributes: {
            isPreview: true,
        },
    },
    attributes: {
        isPreview: {
            type: 'boolean',
            default: false,
            save: false,
        },
        transparentButton: {
            type: 'boolean',
            default: true,
        },
    },
    edit: edit_1.default,
    save: function () {
        return null;
    },
};
(0, block_settings_1.registerExperimentalBlockType)('woocommerce/mini-cart', settings);
