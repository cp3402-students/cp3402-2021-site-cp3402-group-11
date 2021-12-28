"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var hooks_1 = require("@woocommerce/base-context/hooks");
var classnames_1 = require("classnames");
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
    return (<div className={(0, classnames_1.default)('wc-block-cart__payment-options', className)}>
			<payment_methods_1.CartExpressPayment />
		</div>);
};
exports.default = Block;
