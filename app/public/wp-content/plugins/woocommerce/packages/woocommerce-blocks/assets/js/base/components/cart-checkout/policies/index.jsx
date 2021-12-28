"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var block_settings_1 = require("@woocommerce/block-settings");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
require("./style.scss");
var Policies = function () {
    return (<ul className="wc-block-components-checkout-policies">
			{block_settings_1.PRIVACY_URL && (<li className="wc-block-components-checkout-policies__item">
					<a href={block_settings_1.PRIVACY_URL} target="_blank" rel="noopener noreferrer">
						{block_settings_1.PRIVACY_PAGE_NAME
                ? (0, html_entities_1.decodeEntities)(block_settings_1.PRIVACY_PAGE_NAME)
                : (0, i18n_1.__)('Privacy Policy', 'woo-gutenberg-products-block')}
					</a>
				</li>)}
			{block_settings_1.TERMS_URL && (<li className="wc-block-components-checkout-policies__item">
					<a href={block_settings_1.TERMS_URL} target="_blank" rel="noopener noreferrer">
						{block_settings_1.TERMS_PAGE_NAME
                ? (0, html_entities_1.decodeEntities)(block_settings_1.TERMS_PAGE_NAME)
                : (0, i18n_1.__)('Terms and Conditions', 'woo-gutenberg-products-block')}
					</a>
				</li>)}
		</ul>);
};
exports.default = Policies;
