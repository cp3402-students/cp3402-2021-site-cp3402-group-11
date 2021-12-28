"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
var settings_1 = require("@woocommerce/settings");
var external_link_card_1 = require("@woocommerce/editor-components/external-link-card");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var form_step_1 = require("../../form-step");
var block_1 = require("./block");
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var globalShippingMethods = (0, settings_1.getSetting)('globalShippingMethods');
    var activeShippingZones = (0, settings_1.getSetting)('activeShippingZones');
    return (<form_step_1.FormStepBlock attributes={attributes} setAttributes={setAttributes} className={(0, classnames_1.default)('wc-block-checkout__shipping-option', attributes === null || attributes === void 0 ? void 0 : attributes.className)}>
			<block_editor_1.InspectorControls>
				{globalShippingMethods.length > 0 && (<components_1.PanelBody title={(0, i18n_1.__)('Methods', 'woo-gutenberg-products-block')}>
						<p className="wc-block-checkout__controls-text">
							{(0, i18n_1.__)('You currently have the following shipping integrations active.', 'woo-gutenberg-products-block')}
						</p>
						{globalShippingMethods.map(function (method) {
                return (<external_link_card_1.default key={method.id} href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=shipping&section=" + method.id} title={method.title} description={method.description}/>);
            })}
						<components_1.ExternalLink href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=shipping"}>
							{(0, i18n_1.__)('Manage shipping methods', 'woo-gutenberg-products-block')}
						</components_1.ExternalLink>
					</components_1.PanelBody>)}
				{activeShippingZones.length && (<components_1.PanelBody title={(0, i18n_1.__)('Zones', 'woo-gutenberg-products-block')}>
						<p className="wc-block-checkout__controls-text">
							{(0, i18n_1.__)('You currently have the following shipping zones active.', 'woo-gutenberg-products-block')}
						</p>
						{activeShippingZones.map(function (zone) {
                return (<external_link_card_1.default key={zone.id} href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=shipping&zone_id=" + zone.id} title={zone.title} description={zone.description}/>);
            })}
						<components_1.ExternalLink href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=shipping"}>
							{(0, i18n_1.__)('Manage shipping zones', 'woo-gutenberg-products-block')}
						</components_1.ExternalLink>
					</components_1.PanelBody>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default />
			</components_1.Disabled>
			<form_step_1.AdditionalFields block={blocks_checkout_1.innerBlockAreas.SHIPPING_METHODS}/>
		</form_step_1.FormStepBlock>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<form_step_1.AdditionalFieldsContent />
		</div>);
};
exports.Save = Save;
