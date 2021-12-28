"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var shared_hocs_1 = require("@woocommerce/shared-hocs");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var base_context_1 = require("@woocommerce/base-context");
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var attributes_1 = require("./attributes");
var context_1 = require("../../context");
var FrontendBlock = function (_a) {
    var title = _a.title, description = _a.description, showStepNumber = _a.showStepNumber, children = _a.children, className = _a.className;
    var checkoutIsProcessing = (0, base_context_1.useCheckoutContext)().isProcessing;
    var showShippingFields = (0, hooks_1.useCheckoutAddress)().showShippingFields;
    var _b = (0, context_1.useCheckoutBlockContext)(), requireCompanyField = _b.requireCompanyField, requirePhoneField = _b.requirePhoneField, showApartmentField = _b.showApartmentField, showCompanyField = _b.showCompanyField, showPhoneField = _b.showPhoneField;
    if (!showShippingFields) {
        return null;
    }
    return (<cart_checkout_1.FormStep id="shipping-fields" disabled={checkoutIsProcessing} className={(0, classnames_1.default)('wc-block-checkout__shipping-fields', className)} title={title} description={description} showStepNumber={showStepNumber}>
			<block_1.default requireCompanyField={requireCompanyField} requirePhoneField={requirePhoneField} showApartmentField={showApartmentField} showCompanyField={showCompanyField} showPhoneField={showPhoneField}/>
			{children}
		</cart_checkout_1.FormStep>);
};
exports.default = (0, shared_hocs_1.withFilteredAttributes)(attributes_1.default)(FrontendBlock);
