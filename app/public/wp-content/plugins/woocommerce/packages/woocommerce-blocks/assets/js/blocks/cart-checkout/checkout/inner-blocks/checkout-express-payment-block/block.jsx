"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
var payment_methods_1 = require("../../../payment-methods");
var Block = function (_a) {
    var className = _a.className;
    var cartNeedsPayment = (0, hooks_1.useStoreCart)().cartNeedsPayment;
    if (!cartNeedsPayment) {
        return null;
    }
    return (<div className={className}>
			<payment_methods_1.CheckoutExpressPayment />
		</div>);
};
exports.default = Block;
