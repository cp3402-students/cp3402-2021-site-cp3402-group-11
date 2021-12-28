"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCK_DESCRIPTION = exports.BLOCK_ICON = exports.BLOCK_TITLE = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var icons_1 = require("@woocommerce/icons");
exports.BLOCK_TITLE = (0, i18n_1.__)('Product Category List', 'woo-gutenberg-products-block');
exports.BLOCK_ICON = <icons_1.Icon srcElement={icons_1.folder}/>;
exports.BLOCK_DESCRIPTION = (0, i18n_1.__)('Display a list of categories belonging to a product.', 'woo-gutenberg-products-block');
