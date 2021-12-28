"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var form_step_1 = require("../../form-step");
var context_1 = require("../../context");
var block_1 = require("./block");
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var _b = (0, context_1.useCheckoutBlockContext)(), showCompanyField = _b.showCompanyField, showApartmentField = _b.showApartmentField, requireCompanyField = _b.requireCompanyField, showPhoneField = _b.showPhoneField, requirePhoneField = _b.requirePhoneField;
    var Controls = (0, context_1.useCheckoutBlockControlsContext)().addressFieldControls;
    return (<form_step_1.FormStepBlock setAttributes={setAttributes} attributes={attributes} className={(0, classnames_1.default)('wc-block-checkout__shipping-fields', attributes === null || attributes === void 0 ? void 0 : attributes.className)}>
			<Controls />
			<block_1.default showCompanyField={showCompanyField} showApartmentField={showApartmentField} requireCompanyField={requireCompanyField} showPhoneField={showPhoneField} requirePhoneField={requirePhoneField}/>
			<form_step_1.AdditionalFields block={blocks_checkout_1.innerBlockAreas.SHIPPING_ADDRESS}/>
		</form_step_1.FormStepBlock>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<form_step_1.AdditionalFieldsContent />
		</div>);
};
exports.Save = Save;
