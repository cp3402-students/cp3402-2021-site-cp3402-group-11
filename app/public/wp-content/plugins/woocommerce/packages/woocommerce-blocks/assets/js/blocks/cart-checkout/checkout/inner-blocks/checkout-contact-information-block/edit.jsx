"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var form_step_1 = require("../../form-step");
var block_1 = require("./block");
var context_1 = require("../../context");
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var allowCreateAccount = (0, context_1.useCheckoutBlockContext)().allowCreateAccount;
    var Controls = (0, context_1.useCheckoutBlockControlsContext)().accountControls;
    return (<form_step_1.FormStepBlock attributes={attributes} setAttributes={setAttributes} className={(0, classnames_1.default)('wc-block-checkout__contact-fields', attributes === null || attributes === void 0 ? void 0 : attributes.className)}>
			<Controls />
			<components_1.Disabled>
				<block_1.default allowCreateAccount={allowCreateAccount}/>
			</components_1.Disabled>
			<form_step_1.AdditionalFields block={blocks_checkout_1.innerBlockAreas.CONTACT_INFORMATION}/>
		</form_step_1.FormStepBlock>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<form_step_1.AdditionalFieldsContent />
		</div>);
};
exports.Save = Save;
