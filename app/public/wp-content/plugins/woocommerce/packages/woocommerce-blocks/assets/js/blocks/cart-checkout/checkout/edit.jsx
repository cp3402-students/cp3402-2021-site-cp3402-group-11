"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var base_context_1 = require("@woocommerce/base-context");
var resource_previews_1 = require("@woocommerce/resource-previews");
var components_1 = require("@wordpress/components");
var feedback_prompt_1 = require("@woocommerce/editor-components/feedback-prompt");
var block_settings_1 = require("@woocommerce/block-settings");
var element_1 = require("@wordpress/element");
var settings_1 = require("@woocommerce/settings");
var compatibility_notices_1 = require("@woocommerce/editor-components/compatibility-notices");
/**
 * Internal dependencies
 */
require("./styles/editor.scss");
var shared_1 = require("../shared");
var context_1 = require("./context");
// This is adds a class to body to signal if the selected block is locked
(0, shared_1.addClassToBody)();
// Array of allowed block names.
var ALLOWED_BLOCKS = [
    'woocommerce/checkout-fields-block',
    'woocommerce/checkout-totals-block',
];
var BlockSettings = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var hasDarkControls = attributes.hasDarkControls;
    var currentPostId = (0, base_context_1.useEditorContext)().currentPostId;
    return (<block_editor_1.InspectorControls>
			{currentPostId !== block_settings_1.CHECKOUT_PAGE_ID && (<components_1.Notice className="wc-block-checkout__page-notice" isDismissible={false} status="warning">
					{(0, element_1.createInterpolateElement)((0, i18n_1.__)('If you would like to use this block as your default checkout you must update your <a>page settings in WooCommerce</a>.', 'woo-gutenberg-products-block'), {
                a: (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a href={(0, settings_1.getAdminLink)('admin.php?page=wc-settings&tab=advanced')} target="_blank" rel="noopener noreferrer"/>),
            })}
				</components_1.Notice>)}
			<components_1.PanelBody title={(0, i18n_1.__)('Style', 'woo-gutenberg-products-block')}>
				<components_1.ToggleControl label={(0, i18n_1.__)('Dark mode inputs', 'woo-gutenberg-products-block')} help={(0, i18n_1.__)('Inputs styled specifically for use on dark background colors.', 'woo-gutenberg-products-block')} checked={hasDarkControls} onChange={function () {
            return setAttributes({
                hasDarkControls: !hasDarkControls,
            });
        }}/>
			</components_1.PanelBody>
			<feedback_prompt_1.CartCheckoutFeedbackPrompt />
		</block_editor_1.InspectorControls>);
};
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var allowCreateAccount = attributes.allowCreateAccount, showCompanyField = attributes.showCompanyField, requireCompanyField = attributes.requireCompanyField, showApartmentField = attributes.showApartmentField, showPhoneField = attributes.showPhoneField, requirePhoneField = attributes.requirePhoneField, showOrderNotes = attributes.showOrderNotes, showPolicyLinks = attributes.showPolicyLinks, showReturnToCart = attributes.showReturnToCart, showRateAfterTaxName = attributes.showRateAfterTaxName, cartPageId = attributes.cartPageId;
    var defaultTemplate = [
        ['woocommerce/checkout-fields-block', {}, []],
        ['woocommerce/checkout-totals-block', {}, []],
    ];
    var toggleAttribute = function (key) {
        var newAttributes = {};
        newAttributes[key] = !attributes[key];
        setAttributes(newAttributes);
    };
    var accountControls = function () { return (<block_editor_1.InspectorControls>
			<components_1.PanelBody title={(0, i18n_1.__)('Account options', 'woo-gutenberg-products-block')}>
				<components_1.ToggleControl label={(0, i18n_1.__)('Allow shoppers to sign up for a user account during checkout', 'woo-gutenberg-products-block')} checked={allowCreateAccount} onChange={function () {
            return setAttributes({
                allowCreateAccount: !allowCreateAccount,
            });
        }}/>
			</components_1.PanelBody>
		</block_editor_1.InspectorControls>); };
    var addressFieldControls = function () { return (<block_editor_1.InspectorControls>
			<components_1.PanelBody title={(0, i18n_1.__)('Address Fields', 'woo-gutenberg-products-block')}>
				<p className="wc-block-checkout__controls-text">
					{(0, i18n_1.__)('Show or hide fields in the checkout address forms.', 'woo-gutenberg-products-block')}
				</p>
				<components_1.ToggleControl label={(0, i18n_1.__)('Company', 'woo-gutenberg-products-block')} checked={showCompanyField} onChange={function () { return toggleAttribute('showCompanyField'); }}/>
				{showCompanyField && (<components_1.CheckboxControl label={(0, i18n_1.__)('Require company name?', 'woo-gutenberg-products-block')} checked={requireCompanyField} onChange={function () {
                return toggleAttribute('requireCompanyField');
            }} className="components-base-control--nested"/>)}
				<components_1.ToggleControl label={(0, i18n_1.__)('Apartment, suite, etc.', 'woo-gutenberg-products-block')} checked={showApartmentField} onChange={function () { return toggleAttribute('showApartmentField'); }}/>
				<components_1.ToggleControl label={(0, i18n_1.__)('Phone', 'woo-gutenberg-products-block')} checked={showPhoneField} onChange={function () { return toggleAttribute('showPhoneField'); }}/>
				{showPhoneField && (<components_1.CheckboxControl label={(0, i18n_1.__)('Require phone number?', 'woo-gutenberg-products-block')} checked={requirePhoneField} onChange={function () {
                return toggleAttribute('requirePhoneField');
            }} className="components-base-control--nested"/>)}
			</components_1.PanelBody>
		</block_editor_1.InspectorControls>); };
    var blockProps = (0, shared_1.useBlockPropsWithLocking)();
    return (<div {...blockProps}>
			<base_context_1.EditorProvider previewData={{ previewCart: resource_previews_1.previewCart, previewSavedPaymentMethods: resource_previews_1.previewSavedPaymentMethods }}>
				<BlockSettings attributes={attributes} setAttributes={setAttributes}/>
				<base_context_1.CheckoutProvider>
					<sidebar_layout_1.SidebarLayout className={(0, classnames_1.default)('wc-block-checkout', {
            'has-dark-controls': attributes.hasDarkControls,
        })}>
						<context_1.CheckoutBlockControlsContext.Provider value={{
            addressFieldControls: addressFieldControls,
            accountControls: accountControls,
        }}>
							<context_1.CheckoutBlockContext.Provider value={{
            allowCreateAccount: allowCreateAccount,
            showCompanyField: showCompanyField,
            requireCompanyField: requireCompanyField,
            showApartmentField: showApartmentField,
            showPhoneField: showPhoneField,
            requirePhoneField: requirePhoneField,
            showOrderNotes: showOrderNotes,
            showPolicyLinks: showPolicyLinks,
            showReturnToCart: showReturnToCart,
            cartPageId: cartPageId,
            showRateAfterTaxName: showRateAfterTaxName,
        }}>
								<block_editor_1.InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={defaultTemplate} templateLock="insert"/>
							</context_1.CheckoutBlockContext.Provider>
						</context_1.CheckoutBlockControlsContext.Provider>
					</sidebar_layout_1.SidebarLayout>
				</base_context_1.CheckoutProvider>
			</base_context_1.EditorProvider>
			<compatibility_notices_1.CartCheckoutCompatibilityNotice blockName="checkout"/>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save({
        className: 'wc-block-checkout is-loading',
    })}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
