"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var price_format_1 = require("@woocommerce/price-format");
var base_context_1 = require("@woocommerce/base-context");
var hooks_1 = require("@woocommerce/base-context/hooks");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var Block = function (_a) {
    var _b = _a.showRateAfterTaxName, showRateAfterTaxName = _b === void 0 ? false : _b, className = _a.className;
    var _c = (0, hooks_1.useStoreCart)(), cartItems = _c.cartItems, cartTotals = _c.cartTotals, cartCoupons = _c.cartCoupons, cartFees = _c.cartFees;
    var _d = (0, hooks_1.useStoreCartCoupons)(), applyCoupon = _d.applyCoupon, removeCoupon = _d.removeCoupon, isApplyingCoupon = _d.isApplyingCoupon, isRemovingCoupon = _d.isRemovingCoupon;
    var needsShipping = (0, base_context_1.useShippingDataContext)().needsShipping;
    var totalsCurrency = (0, price_format_1.getCurrencyFromPriceResponse)(cartTotals);
    // Prepare props to pass to the ExperimentalOrderMeta slot fill.
    // We need to pluck out receiveCart.
    // eslint-disable-next-line no-unused-vars
    var _e = (0, hooks_1.useStoreCart)(), extensions = _e.extensions, receiveCart = _e.receiveCart, cart = __rest(_e, ["extensions", "receiveCart"]);
    var slotFillProps = {
        extensions: extensions,
        cart: cart,
    };
    return (<div className={className}>
			<blocks_checkout_1.TotalsWrapper>
				<cart_checkout_1.OrderSummary cartItems={cartItems}/>
			</blocks_checkout_1.TotalsWrapper>
			<blocks_checkout_1.TotalsWrapper>
				<blocks_checkout_1.Subtotal currency={totalsCurrency} values={cartTotals}/>
				<blocks_checkout_1.TotalsFees currency={totalsCurrency} cartFees={cartFees}/>
				<cart_checkout_1.TotalsDiscount cartCoupons={cartCoupons} currency={totalsCurrency} isRemovingCoupon={isRemovingCoupon} removeCoupon={removeCoupon} values={cartTotals}/>
			</blocks_checkout_1.TotalsWrapper>
			{(0, settings_1.getSetting)('couponsEnabled', true) && (<blocks_checkout_1.TotalsWrapper>
					<cart_checkout_1.TotalsCoupon onSubmit={applyCoupon} initialOpen={false} isLoading={isApplyingCoupon}/>
				</blocks_checkout_1.TotalsWrapper>)}
			{needsShipping && (<blocks_checkout_1.TotalsWrapper>
					<cart_checkout_1.TotalsShipping showCalculator={false} showRateSelector={false} values={cartTotals} currency={totalsCurrency}/>
				</blocks_checkout_1.TotalsWrapper>)}
			<blocks_checkout_1.ExperimentalDiscountsMeta.Slot {...slotFillProps}/>
			{!(0, settings_1.getSetting)('displayCartPricesIncludingTax', false) &&
            parseInt(cartTotals.total_tax, 10) > 0 && (<blocks_checkout_1.TotalsWrapper>
						<blocks_checkout_1.TotalsTaxes currency={totalsCurrency} showRateAfterTaxName={showRateAfterTaxName} values={cartTotals}/>
					</blocks_checkout_1.TotalsWrapper>)}
			<blocks_checkout_1.TotalsWrapper>
				<cart_checkout_1.TotalsFooterItem currency={totalsCurrency} values={cartTotals}/>
			</blocks_checkout_1.TotalsWrapper>
			<blocks_checkout_1.ExperimentalOrderMeta.Slot {...slotFillProps}/>
		</div>);
};
exports.default = Block;
