"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormStepBlock = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
var form_step_heading_1 = require("./form-step-heading");
/**
 * Form Step Block for use in the editor.
 */
var FormStepBlock = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes, _b = _a.className, className = _b === void 0 ? '' : _b, children = _a.children;
    var _c = attributes.title, title = _c === void 0 ? '' : _c, _d = attributes.description, description = _d === void 0 ? '' : _d, _e = attributes.showStepNumber, showStepNumber = _e === void 0 ? true : _e;
    var blockProps = (0, block_editor_1.useBlockProps)({
        className: (0, classnames_1.default)('wc-block-components-checkout-step', className, {
            'wc-block-components-checkout-step--with-step-number': showStepNumber,
        }),
    });
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				<components_1.PanelBody title={(0, i18n_1.__)('Form Step Options', 'woo-gutenberg-products-block')}>
					<components_1.ToggleControl label={(0, i18n_1.__)('Show step number', 'woo-gutenberg-products-block')} checked={showStepNumber} onChange={function () {
            return setAttributes({
                showStepNumber: !showStepNumber,
            });
        }}/>
				</components_1.PanelBody>
			</block_editor_1.InspectorControls>
			<form_step_heading_1.default>
				<block_editor_1.PlainText className={''} value={title} onChange={function (value) { return setAttributes({ title: value }); }}/>
			</form_step_heading_1.default>
			<div className="wc-block-components-checkout-step__container">
				<p className="wc-block-components-checkout-step__description">
					<block_editor_1.PlainText className={!description
            ? 'wc-block-components-checkout-step__description-placeholder'
            : ''} value={description} placeholder={(0, i18n_1.__)('Optional text for this form step.', 'woo-gutenberg-products-block')} onChange={function (value) {
            return setAttributes({
                description: value,
            });
        }}/>
				</p>
				<div className="wc-block-components-checkout-step__content">
					{children}
				</div>
			</div>
		</div>);
};
exports.FormStepBlock = FormStepBlock;
