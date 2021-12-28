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
var FrontendBlock = function (_a) {
    var title = _a.title, description = _a.description, showStepNumber = _a.showStepNumber, children = _a.children, className = _a.className;
    var checkoutIsProcessing = (0, base_context_1.useCheckoutContext)().isProcessing;
    var showShippingFields = (0, hooks_1.useCheckoutAddress)().showShippingFields;
    if (!showShippingFields) {
        return null;
    }
    return (<cart_checkout_1.FormStep id="shipping-option" disabled={checkoutIsProcessing} className={(0, classnames_1.default)('wc-block-checkout__shipping-option', className)} title={title} description={description} showStepNumber={showStepNumber}>
			<block_1.default />
			{children}
		</cart_checkout_1.FormStep>);
};
exports.default = (0, shared_hocs_1.withFilteredAttributes)(attributes_1.default)(FrontendBlock);
