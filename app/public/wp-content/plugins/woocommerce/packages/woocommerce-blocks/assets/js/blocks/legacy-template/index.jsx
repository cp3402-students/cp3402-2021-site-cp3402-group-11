"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var blocks_1 = require("@wordpress/blocks");
var block_settings_1 = require("@woocommerce/block-settings");
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
var i18n_1 = require("@wordpress/i18n");
var icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
require("./editor.scss");
var constants_1 = require("./constants");
var Edit = function (_a) {
    var _b, _c, _d, _e;
    var attributes = _a.attributes;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var templateTitle = (_c = (_b = constants_1.TEMPLATES[attributes.template]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : attributes.template;
    var templatePlaceholder = (_e = (_d = constants_1.TEMPLATES[attributes.template]) === null || _d === void 0 ? void 0 : _d.placeholder) !== null && _e !== void 0 ? _e : 'fallback';
    return (<div {...blockProps}>
			<components_1.Placeholder icon={icons_1.page} label={templateTitle} className="wp-block-woocommerce-legacy-template__placeholder">
				<div className="wp-block-woocommerce-legacy-template__placeholder-copy">
					{(0, i18n_1.sprintf)(
        /* translators: %s is the template title */
        (0, i18n_1.__)('This is an editor placeholder for the %s. On your store this will be replaced by the template and display with your product image(s), title, price, etc. You can move this placeholder around and add further blocks around it to extend the template.', 'woo-gutenberg-products-block'), templateTitle)}
				</div>
				<div className="wp-block-woocommerce-legacy-template__placeholder-wireframe">
					<img className="wp-block-woocommerce-legacy-template__placeholder-image" src={block_settings_1.WC_BLOCKS_IMAGE_URL + "template-placeholders/" + templatePlaceholder + ".svg"} alt={templateTitle}/>
				</div>
			</components_1.Placeholder>
		</div>);
};
(0, blocks_1.registerBlockType)('woocommerce/legacy-template', {
    title: (0, i18n_1.__)('WooCommerce Legacy Template', 'woo-gutenberg-products-block'),
    category: 'woocommerce',
    apiVersion: 2,
    keywords: [(0, i18n_1.__)('WooCommerce', 'woo-gutenberg-products-block')],
    description: (0, i18n_1.__)('Renders legacy WooCommerce PHP templates.', 'woo-gutenberg-products-block'),
    supports: {
        align: false,
        html: false,
        multiple: false,
        reusable: false,
        inserter: false,
    },
    example: {
        attributes: {
            isPreview: true,
        },
    },
    attributes: {
        /**
         * Template attribute is used to determine which core PHP template gets rendered.
         */
        template: {
            type: 'string',
            default: 'any',
        },
    },
    edit: Edit,
    save: function () { return null; },
});
