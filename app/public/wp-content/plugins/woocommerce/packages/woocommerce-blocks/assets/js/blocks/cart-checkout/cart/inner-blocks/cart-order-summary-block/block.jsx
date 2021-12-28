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
var i18n_1 = require("@wordpress/i18n");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var price_format_1 = require("@woocommerce/price-format");
var hooks_1 = require("@woocommerce/base-context/hooks");
var settings_1 = require("@woocommerce/settings");
var title_1 = require("@woocommerce/base-components/title");
/**
 * Internal dependencies
 */
var Block = function (_a) {
    var className = _a.className, _b = _a.showRateAfterTaxName, showRateAfterTaxName = _b === void 0 ? false : _b, _c = _a.isShippingCalculatorEnabled, isShippingCalculatorEnabled = _c === void 0 ? true : _c;
    var _d = (0, hooks_1.useStoreCart)(), cartFees = _d.cartFees, cartTotals = _d.cartTotals, cartNeedsShipping = _d.cartNeedsShipping;
    var _e = (0, hooks_1.useStoreCartCoupons)(), applyCoupon = _e.applyCoupon, removeCoupon = _e.removeCoupon, isApplyingCoupon = _e.isApplyingCoupon, isRemovingCoupon = _e.isRemovingCoupon, appliedCoupons = _e.appliedCoupons;
    var totalsCurrency = (0, price_format_1.getCurrencyFromPriceResponse)(cartTotals);
    // Prepare props to pass to the ExperimentalOrderMeta slot fill.
    // We need to pluck out receiveCart.
    // eslint-disable-next-line no-unused-vars
    var _f = (0, hooks_1.useStoreCart)(), extensions = _f.extensions, receiveCart = _f.receiveCart, cart = __rest(_f, ["extensions", "receiveCart"]);
    var slotFillProps = {
        extensions: extensions,
        cart: cart,
    };
    var discountsSlotFillProps = {
        extensions: extensions,
        cart: cart,
    };
    return (<div className={className}>
			<title_1.default headingLevel="2" className="wc-block-cart__totals-title">
				{(0, i18n_1.__)('Cart totals', 'woo-gutenberg-products-block')}
			</title_1.default>
			<blocks_checkout_1.TotalsWrapper>
				<blocks_checkout_1.Subtotal currency={totalsCurrency} values={cartTotals}/>
				<blocks_checkout_1.TotalsFees currency={totalsCurrency} cartFees={cartFees}/>
				<cart_checkout_1.TotalsDiscount cartCoupons={appliedCoupons} currency={totalsCurrency} isRemovingCoupon={isRemovingCoupon} removeCoupon={removeCoupon} values={cartTotals}/>
			</blocks_checkout_1.TotalsWrapper>
			{(0, settings_1.getSetting)('couponsEnabled', true) && (<blocks_checkout_1.TotalsWrapper>
					<cart_checkout_1.TotalsCoupon onSubmit={applyCoupon} isLoading={isApplyingCoupon}/>
				</blocks_checkout_1.TotalsWrapper>)}
			<blocks_checkout_1.ExperimentalDiscountsMeta.Slot {...discountsSlotFillProps}/>
			{cartNeedsShipping && (<blocks_checkout_1.TotalsWrapper>
					<cart_checkout_1.TotalsShipping showCalculator={isShippingCalculatorEnabled} showRateSelector={true} values={cartTotals} currency={totalsCurrency}/>
				</blocks_checkout_1.TotalsWrapper>)}
			{!(0, settings_1.getSetting)('displayCartPricesIncludingTax', false) &&
            parseInt(cartTotals.total_tax, 10) > 0 && (<blocks_checkout_1.TotalsWrapper>
						<blocks_checkout_1.TotalsTaxes showRateAfterTaxName={showRateAfterTaxName} currency={totalsCurrency} values={cartTotals}/>
					</blocks_checkout_1.TotalsWrapper>)}
			<blocks_checkout_1.TotalsWrapper>
				<cart_checkout_1.TotalsFooterItem currency={totalsCurrency} values={cartTotals}/>
			</blocks_checkout_1.TotalsWrapper>

			<blocks_checkout_1.ExperimentalOrderMeta.Slot {...slotFillProps}/>
		</div>);
};
exports.default = Block;
