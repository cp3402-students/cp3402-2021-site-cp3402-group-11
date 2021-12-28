"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var base_context_1 = require("@woocommerce/base-context");
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
var payment_methods_1 = require("../../../payment-methods");
var Block = function () {
    var noticeContexts = (0, hooks_1.useEmitResponse)().noticeContexts;
    return (<base_context_1.StoreNoticesProvider context={noticeContexts.PAYMENTS}>
			<payment_methods_1.PaymentMethods />
		</base_context_1.StoreNoticesProvider>);
};
exports.default = Block;
