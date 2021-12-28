"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var shared_hocs_1 = require("@woocommerce/shared-hocs");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var attributes_1 = require("./attributes");
var login_prompt_1 = require("./login-prompt");
var context_1 = require("../../context");
var FrontendBlock = function (_a) {
    var title = _a.title, description = _a.description, showStepNumber = _a.showStepNumber, children = _a.children, className = _a.className;
    var checkoutIsProcessing = (0, base_context_1.useCheckoutContext)().isProcessing;
    var allowCreateAccount = (0, context_1.useCheckoutBlockContext)().allowCreateAccount;
    return (<cart_checkout_1.FormStep id="contact-fields" disabled={checkoutIsProcessing} className={(0, classnames_1.default)('wc-block-checkout__contact-fields', className)} title={title} description={description} showStepNumber={showStepNumber} stepHeadingContent={function () { return <login_prompt_1.default />; }}>
			<block_1.default allowCreateAccount={allowCreateAccount}/>
			{children}
		</cart_checkout_1.FormStep>);
};
exports.default = (0, shared_hocs_1.withFilteredAttributes)(attributes_1.default)(FrontendBlock);
