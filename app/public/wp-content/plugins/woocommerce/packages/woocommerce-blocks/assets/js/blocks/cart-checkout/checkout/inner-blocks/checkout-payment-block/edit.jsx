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
    var globalPaymentMethods = (0, settings_1.getSetting)('globalPaymentMethods');
    return (<form_step_1.FormStepBlock attributes={attributes} setAttributes={setAttributes} className={(0, classnames_1.default)('wc-block-checkout__payment-method', attributes === null || attributes === void 0 ? void 0 : attributes.className)}>
			<block_editor_1.InspectorControls>
				{globalPaymentMethods.length > 0 && (<components_1.PanelBody title={(0, i18n_1.__)('Methods', 'woo-gutenberg-products-block')}>
						<p className="wc-block-checkout__controls-text">
							{(0, i18n_1.__)('You currently have the following payment integrations active.', 'woo-gutenberg-products-block')}
						</p>
						{globalPaymentMethods.map(function (method) {
                return (<external_link_card_1.default key={method.id} href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=checkout&section=" + method.id} title={method.title} description={method.description}/>);
            })}
						<components_1.ExternalLink href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=checkout"}>
							{(0, i18n_1.__)('Manage payment methods', 'woo-gutenberg-products-block')}
						</components_1.ExternalLink>
					</components_1.PanelBody>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default />
			</components_1.Disabled>
			<form_step_1.AdditionalFields block={blocks_checkout_1.innerBlockAreas.PAYMENT_METHODS}/>
		</form_step_1.FormStepBlock>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<form_step_1.AdditionalFieldsContent />
		</div>);
};
exports.Save = Save;
