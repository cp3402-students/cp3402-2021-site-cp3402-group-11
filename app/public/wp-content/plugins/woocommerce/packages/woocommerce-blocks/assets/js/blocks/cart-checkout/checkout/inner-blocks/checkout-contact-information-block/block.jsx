"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var text_input_1 = require("@woocommerce/base-components/text-input");
var base_context_1 = require("@woocommerce/base-context");
var settings_1 = require("@woocommerce/settings");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var Block = function (_a) {
    var allowCreateAccount = _a.allowCreateAccount;
    var _b = (0, base_context_1.useCheckoutContext)(), customerId = _b.customerId, shouldCreateAccount = _b.shouldCreateAccount, setShouldCreateAccount = _b.setShouldCreateAccount;
    var _c = (0, base_context_1.useCheckoutAddress)(), billingFields = _c.billingFields, setEmail = _c.setEmail;
    var dispatchCheckoutEvent = (0, base_context_1.useStoreEvents)().dispatchCheckoutEvent;
    var onChangeEmail = function (value) {
        setEmail(value);
        dispatchCheckoutEvent('set-email-address');
    };
    var createAccountUI = !customerId &&
        allowCreateAccount &&
        (0, settings_1.getSetting)('checkoutAllowsGuest', false) &&
        (0, settings_1.getSetting)('checkoutAllowsSignup', false) && (<blocks_checkout_1.CheckboxControl className="wc-block-checkout__create-account" label={(0, i18n_1.__)('Create an account?', 'woo-gutenberg-products-block')} checked={shouldCreateAccount} onChange={function (value) { return setShouldCreateAccount(value); }}/>);
    return (<>
			<text_input_1.ValidatedTextInput id="email" type="email" label={(0, i18n_1.__)('Email address', 'woo-gutenberg-products-block')} value={billingFields.email} autoComplete="email" onChange={onChangeEmail} required={true}/>
			{createAccountUI}
		</>);
};
exports.default = Block;
