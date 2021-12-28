"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var order_notes_1 = require("../../order-notes");
var Block = function (_a) {
    var className = _a.className;
    var needsShipping = (0, base_context_1.useShippingDataContext)().needsShipping;
    var _b = (0, base_context_1.useCheckoutContext)(), checkoutIsProcessing = _b.isProcessing, orderNotes = _b.orderNotes, dispatchActions = _b.dispatchActions;
    var setOrderNotes = dispatchActions.setOrderNotes;
    return (<cart_checkout_1.FormStep id="order-notes" showStepNumber={false} className={(0, classnames_1.default)('wc-block-checkout__order-notes', className)} disabled={checkoutIsProcessing}>
			<order_notes_1.default disabled={checkoutIsProcessing} onChange={setOrderNotes} placeholder={needsShipping
            ? (0, i18n_1.__)('Notes about your order, e.g. special notes for delivery.', 'woo-gutenberg-products-block')
            : (0, i18n_1.__)('Notes about your order.', 'woo-gutenberg-products-block')} value={orderNotes}/>
		</cart_checkout_1.FormStep>);
};
exports.default = Block;
