"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var components_1 = require("@wordpress/components");
var compose_1 = require("@wordpress/compose");
var block_editor_1 = require("@wordpress/block-editor");
var block_settings_1 = require("@woocommerce/block-settings");
var heading_toolbar_1 = require("@woocommerce/editor-components/heading-toolbar");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var with_product_selector_1 = require("../shared/with-product-selector");
var constants_1 = require("./constants");
var TitleEdit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var headingLevel = attributes.headingLevel, showProductLink = attributes.showProductLink, align = attributes.align;
    return (<div {...blockProps}>
			<block_editor_1.BlockControls>
				<heading_toolbar_1.default isCollapsed={true} minLevel={1} maxLevel={7} selectedLevel={headingLevel} onChange={function (newLevel) {
            return setAttributes({ headingLevel: newLevel });
        }}/>
				{(0, block_settings_1.isFeaturePluginBuild)() && (<block_editor_1.AlignmentToolbar value={align} onChange={function (newAlign) {
                setAttributes({ align: newAlign });
            }}/>)}
			</block_editor_1.BlockControls>
			<block_editor_1.InspectorControls>
				<components_1.PanelBody title={(0, i18n_1.__)('Content', 'woo-gutenberg-products-block')}>
					<components_1.ToggleControl label={(0, i18n_1.__)('Link to Product Page', 'woo-gutenberg-products-block')} help={(0, i18n_1.__)('Links the image to the single product listing.', 'woo-gutenberg-products-block')} checked={showProductLink} onChange={function () {
            return setAttributes({
                showProductLink: !showProductLink,
            });
        }}/>
				</components_1.PanelBody>
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default {...attributes}/>
			</components_1.Disabled>
		</div>);
};
var Title = (0, block_settings_1.isFeaturePluginBuild)()
    ? (0, compose_1.compose)([
        (0, with_product_selector_1.default)({
            icon: constants_1.BLOCK_ICON,
            label: constants_1.BLOCK_TITLE,
            description: (0, i18n_1.__)('Choose a product to display its title.', 'woo-gutenberg-products-block'),
        }),
    ])(TitleEdit)
    : TitleEdit;
exports.default = Title;
