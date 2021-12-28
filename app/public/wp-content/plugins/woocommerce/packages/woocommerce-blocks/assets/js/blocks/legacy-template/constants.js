"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATES = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
exports.TEMPLATES = {
    'single-product': {
        title: (0, i18n_1.__)('WooCommerce Single Product Template', 'woo-gutenberg-products-block'),
        placeholder: 'single-product',
    },
    'archive-product': {
        title: (0, i18n_1.__)('WooCommerce Product Archive Template', 'woo-gutenberg-products-block'),
        placeholder: 'archive-product',
    },
    'taxonomy-product_cat': {
        title: (0, i18n_1.__)('WooCommerce Product Taxonomy Template', 'woo-gutenberg-products-block'),
        placeholder: 'archive-product',
    },
    'taxonomy-product_tag': {
        title: (0, i18n_1.__)('WooCommerce Product Tag Template', 'woo-gutenberg-products-block'),
        placeholder: 'archive-product',
    },
};
