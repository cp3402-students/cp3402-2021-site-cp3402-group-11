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
    var showRateAfterTaxName = attributes.showRateAfterTaxName, isShippingCalculatorEnabled = attributes.isShippingCalculatorEnabled, className = attributes.className;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var taxesEnabled = (0, settings_1.getSetting)('taxesEnabled');
    var displayItemizedTaxes = (0, settings_1.getSetting)('displayItemizedTaxes', false);
    var displayCartPricesIncludingTax = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false);
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				{(0, settings_1.getSetting)('shippingEnabled', true) && (<components_1.PanelBody title={(0, i18n_1.__)('Shipping rates', 'woo-gutenberg-products-block')}>
						<components_1.ToggleControl label={(0, i18n_1.__)('Shipping calculator', 'woo-gutenberg-products-block')} help={(0, i18n_1.__)('Allow customers to estimate shipping by entering their address.', 'woo-gutenberg-products-block')} checked={isShippingCalculatorEnabled} onChange={function () {
                return setAttributes({
                    isShippingCalculatorEnabled: !isShippingCalculatorEnabled,
                });
            }}/>
					</components_1.PanelBody>)}
				{taxesEnabled &&
            displayItemizedTaxes &&
            !displayCartPricesIncludingTax && (<components_1.PanelBody title={(0, i18n_1.__)('Taxes', 'woo-gutenberg-products-block')}>
							<components_1.ToggleControl label={(0, i18n_1.__)('Show rate after tax name', 'woo-gutenberg-products-block')} help={(0, i18n_1.__)('Show the percentage rate alongside each tax line in the summary.', 'woo-gutenberg-products-block')} checked={showRateAfterTaxName} onChange={function () {
                return setAttributes({
                    showRateAfterTaxName: !showRateAfterTaxName,
                });
            }}/>
						</components_1.PanelBody>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default className={className} showRateAfterTaxName={showRateAfterTaxName} isShippingCalculatorEnabled={isShippingCalculatorEnabled}/>
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
