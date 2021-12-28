"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var hooks_1 = require("@woocommerce/base-context/hooks");
var icons_1 = require("@woocommerce/icons");
var button_1 = require("@woocommerce/base-components/button");
var PlaceOrderButton = function () {
    var _a = (0, hooks_1.useCheckoutSubmit)(), submitButtonText = _a.submitButtonText, onSubmit = _a.onSubmit, isCalculating = _a.isCalculating, isDisabled = _a.isDisabled, waitingForProcessing = _a.waitingForProcessing, waitingForRedirect = _a.waitingForRedirect;
    return (<button_1.default className="wc-block-components-checkout-place-order-button" onClick={onSubmit} disabled={isCalculating ||
            isDisabled ||
            waitingForProcessing ||
            waitingForRedirect} showSpinner={waitingForProcessing}>
			{waitingForRedirect ? (<icons_1.Icon srcElement={icons_1.done} alt={(0, i18n_1.__)('Done', 'woo-gutenberg-products-block')}/>) : (submitButtonText)}
		</button_1.default>);
};
exports.default = PlaceOrderButton;
