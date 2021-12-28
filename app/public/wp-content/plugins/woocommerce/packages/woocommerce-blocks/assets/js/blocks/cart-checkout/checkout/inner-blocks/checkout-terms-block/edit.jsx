"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var components_1 = require("@wordpress/components");
var block_settings_1 = require("@woocommerce/block-settings");
var settings_1 = require("@woocommerce/settings");
var icons_1 = require("@wordpress/icons");
/**
 * Internal dependencies
 */
require("./editor.scss");
var constants_1 = require("./constants");
var Edit = function (_a) {
    var _b = _a.attributes, checkbox = _b.checkbox, text = _b.text, setAttributes = _a.setAttributes;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var defaultText = checkbox
        ? constants_1.termsCheckboxDefaultText
        : constants_1.termsConsentDefaultText;
    var currentText = text || defaultText;
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				<components_1.PanelBody title={(0, i18n_1.__)('Display options', 'woo-gutenberg-products-block')}>
					<components_1.ToggleControl label={(0, i18n_1.__)('Require checkbox', 'woo-gutenberg-products-block')} checked={checkbox} onChange={function () {
            return setAttributes({
                checkbox: !checkbox,
            });
        }}/>
				</components_1.PanelBody>
			</block_editor_1.InspectorControls>
			<div className="wc-block-checkout__terms">
				{checkbox ? (<>
						<blocks_checkout_1.CheckboxControl id="terms-condition" checked={false}/>
						<block_editor_1.RichText value={currentText} onChange={function (value) {
                return setAttributes({ text: value });
            }}/>
					</>) : (<block_editor_1.RichText tagName="span" value={currentText} onChange={function (value) {
                return setAttributes({ text: value });
            }}/>)}
			</div>
			{/* Show this notice if a terms page or a privacy page is not setup. */}
			{(!block_settings_1.TERMS_URL || !block_settings_1.PRIVACY_URL) && (<components_1.Notice className="wc-block-checkout__terms_notice" status="warning" isDismissible={false} actions={[
                !block_settings_1.TERMS_URL && {
                    className: 'wc-block-checkout__terms_notice-button',
                    label: (<>
									{(0, i18n_1.__)('Setup a Terms and Conditions page', 'woo-gutenberg-products-block')}
									<icons_1.Icon icon={icons_1.external} size={16} className="wc-block-checkout__terms_notice-button__icon"/>
								</>),
                    onClick: function () {
                        return window.open(settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=advanced", '_blank');
                    },
                },
                !block_settings_1.PRIVACY_URL && {
                    className: 'wc-block-checkout__terms_notice-button',
                    label: (<>
									{(0, i18n_1.__)('Setup a Privacy Policy page', 'woo-gutenberg-products-block')}
									<icons_1.Icon size={16} icon={icons_1.external} className="wc-block-checkout__terms_notice-button__icon"/>
								</>),
                    onClick: function () {
                        return window.open(settings_1.ADMIN_URL + "options-privacy.php", '_blank');
                    },
                },
            ].filter(Boolean)}>
					<p>
						{(0, i18n_1.__)("You don't seem to have a Terms and Conditions and/or a Privacy Policy pages setup.", 'woo-gutenberg-products-block')}
					</p>
				</components_1.Notice>)}
			{/* Show this notice if we have both a terms and privacy pages, but they're not present in the text. */}
			{block_settings_1.TERMS_URL &&
            block_settings_1.PRIVACY_URL &&
            !(currentText.includes(block_settings_1.TERMS_URL) &&
                currentText.includes(block_settings_1.PRIVACY_URL)) && (<components_1.Notice className="wc-block-checkout__terms_notice" status="warning" isDismissible={false} actions={constants_1.termsConsentDefaultText !== text
                ? [
                    {
                        label: (0, i18n_1.__)('Restore default text', 'woo-gutenberg-products-block'),
                        onClick: function () {
                            return setAttributes({ text: '' });
                        },
                    },
                ]
                : []}>
						<p>
							{(0, i18n_1.__)('Ensure you add links to your policy pages in this section.', 'woo-gutenberg-products-block')}
						</p>
					</components_1.Notice>)}
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
