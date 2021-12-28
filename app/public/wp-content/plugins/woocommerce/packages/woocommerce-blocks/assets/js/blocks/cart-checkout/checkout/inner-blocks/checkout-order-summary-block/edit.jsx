"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var taxesEnabled = (0, settings_1.getSetting)('taxesEnabled');
    var displayItemizedTaxes = (0, settings_1.getSetting)('displayItemizedTaxes', false);
    var displayCartPricesIncludingTax = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false);
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				{taxesEnabled &&
            displayItemizedTaxes &&
            !displayCartPricesIncludingTax && (<components_1.PanelBody title={(0, i18n_1.__)('Taxes', 'woo-gutenberg-products-block')}>
							<components_1.ToggleControl label={(0, i18n_1.__)('Show rate after tax name', 'woo-gutenberg-products-block')} help={(0, i18n_1.__)('Show the percentage rate alongside each tax line in the summary.', 'woo-gutenberg-products-block')} checked={attributes.showRateAfterTaxName} onChange={function () {
                return setAttributes({
                    showRateAfterTaxName: !attributes.showRateAfterTaxName,
                });
            }}/>
						</components_1.PanelBody>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default showRateAfterTaxName={attributes.showRateAfterTaxName}/>
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
